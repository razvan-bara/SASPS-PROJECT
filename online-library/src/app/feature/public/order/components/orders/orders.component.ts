import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from '@shared/order/Order';
import { OrderFilter } from '@shared/order/OrderFilter';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public rowsExpanded : Map<number, boolean> = new Map<number, boolean>;

  public orders$ : Order[] = [];
  private nextOrders$ : Order[] = [];

  public hideNextPageBtn = false;

  public categoryChoices : Map<number, boolean> = new Map([]);
  public categoryArray : number[] = [];

  public orderChoices : Map<number, boolean> = new Map([]);
  public orderArray : number[] = [];

  public filterChoices : string[] = [];

  public pageNumber : number = 0;
  public queryParams : OrderFilter = {
    "page": this.pageNumber,
    "s": ""
  }

  public nextQueryParams : OrderFilter = {
    "page": this.pageNumber+1,
    "s": "",
  }
  
  error : string = "";

  public ORDER_KEYS = [
    "#ID Comanda",
    "Comandata la",
    "Ridicata la",
    "Inapoiata la",
    "Data inapoiere",
    "Status",
    "Livrare"
  ]

  public BOOK_KEYS = [
    "#",
    "Titlu",
    "Autor",
    "Categorii"
  ]

  public getOrderStatus(order : Order){
    return this.orderService.getOrderStatus(order);
  }

  public getOrderStatusClass(order: Order){
    const status = order.status;
    let styleClass = "";
    switch(status){
      case 0 : styleClass = "is-info"
                break;
      case 1 : styleClass = "is-warning"
                break;
      case 2 : styleClass = "is-success"
                break;
      case 3 : styleClass = "is-danger"
                break;
    }
    return styleClass;

  }

  public constructor(
    private orderService: OrderService, 
    private toastrService : ToastrService
    ) {}

  public searchOrders(title : string){
    this.queryParams.s = title;
    this.nextQueryParams.s = title;    
  }

  private currentOrderPage(res : ApiResponse<Order[]>) : void{
    this.orders$ = res.data;
    if(this.nextOrders$.length <= 0){
      this.error = "Nu exista comenzi disponibile";
    } else {
      this.rowsExpanded = new Map<number, boolean>;
      this.orders$.forEach( order => {
        this.rowsExpanded.set( order.orderId, false );
      })
    }

    if(this.queryParams.s != ""){
      this.error = "Nu am gasit nicio comanda cu acest ID"
    }
  }

  private currentOrderPageError(err : HttpErrorResponse) : void{
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
  }

  private nextOrderPage(res : ApiResponse<Order[]>) : void{
    this.nextOrders$ = res.data;
    if(this.nextOrders$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private nextOrderPageError(res : HttpErrorResponse) : void{
    console.log(res.error);
  }

  private fetchCurrentOrders(){
    this.orderService.getLoggedInUserOrders(this.queryParams).subscribe({
      error: (err) => this.currentOrderPageError(err),
      next: (res) => this.currentOrderPage(res)
    });
  }

  private fetchNextOrders(){
    this.orderService.getLoggedInUserOrders(this.nextQueryParams).subscribe({
      next: (res) => this.nextOrderPage(res),
      error: (err) => this.nextOrderPageError(err)
    });
  }

  private fetchOrders(){
    this.fetchCurrentOrders()
    this.fetchNextOrders()
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  public filterOrders(){
    this.fetchOrders()
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchOrders();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }

  private handleOrderDeleteSucess(res : ApiResponse, orderId : number){
    this.toastrService.success(res.message);
    this.orders$ = this.orders$.filter( order => order.orderId != orderId); 
  }  
  private handleOrderDeleteError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.warning("Nu s-a putut realiza conexiunea la server");
    }else{
      this.toastrService.warning(err.error.message);
    }
  }  

  public deleteOrderRow(bookId : number){  
    this.orderService.deleteOrder(bookId).subscribe({
      next:  res => this.handleOrderDeleteSucess(res, bookId),
      error: err => this.handleOrderDeleteError(err)
    });
  }

  toggleExpandedRow(order : Order) {
    const isExpanded = !this.rowsExpanded.get(order.orderId);
    this.rowsExpanded.set( order.orderId, isExpanded );
  }
}
