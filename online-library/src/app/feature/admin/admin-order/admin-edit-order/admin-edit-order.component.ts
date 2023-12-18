import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@feature/public/order/service/order.service';
import { Order } from '@shared/order/Order';
import { OrderForm } from '@shared/order/OrderForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-order',
  templateUrl: './admin-edit-order.component.html',
  styleUrls: ['./admin-edit-order.component.scss']
})
export class AdminEditOrderComponent implements OnInit {

  order$! : Order;
  error : string = "";
  private id : number;


  constructor(
    private orderService : OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
    this.id = this.route.snapshot.params['id'];
  }

  get getOrderStatusTranslation(){
    return this.orderService.getOrderStatus(this.order$);
  }

  private handleOrderSucess(res : ApiResponse<Order>){
    this.order$ = res.data;
  }

  private handleOrderError(err : HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata";
    } else {
      this.error = err.error.message;
    }
  }

  private fetchOrder(orderId : number){
    this.orderService.getAdminOrder(orderId).subscribe({
      next: res => this.handleOrderSucess(res),
      error: err => this.handleOrderError(err)
    })
  }

  ngOnInit(): void {
    this.fetchOrder(this.id);
  }

  private handleUpdateOrderSuccess(res: ApiResponse<Order>): void{
    this.toastr.success(res.message);
    this.router.navigate(['/admin/orders']);
  }

  private handleUpdateOrderError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public updateOrder(orderData : OrderForm){
    console.log(orderData);
    
    this.orderService.updateAdminOrder(orderData, this.id).subscribe({
      next: (res) => this.handleUpdateOrderSuccess(res),
      error: (err) => this.handleUpdateOrderError(err)
    });
  }
}
