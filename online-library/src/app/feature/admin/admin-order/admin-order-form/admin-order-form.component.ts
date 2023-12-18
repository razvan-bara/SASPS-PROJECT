import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '@feature/public/book/service/book.service';
import { OrderService } from '@feature/public/order/service/order.service';
import { Book } from '@shared/book/Book';
import { Order } from '@shared/order/Order';
import { OrderForm } from '@shared/order/OrderForm';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-order-form',
  templateUrl: './admin-order-form.component.html',
  styleUrls: ['./admin-order-form.component.scss']
})
export class AdminOrderFormComponent implements OnInit, OnDestroy{

  @Input() order! : Order;
  @Input() orderStatus! : number;
  @Input() orderStatusString! : string;

  private resetForm! : Subscription;
  @Input() decideToResetFormEvent! : Observable<Boolean>;

  orderForm! : FormGroup;
  error : string = "";
  overlay = false;
  isDataLoaded = false;
  areBooksLoading = false;
  booksLoaded = false;
  displayBooks = false;
  books$! : Book[];

  @Output() orderFormEvent = new EventEmitter<OrderForm>();

  statusSelectData : any = [
    {
      label: 'Optiuni',
      options: [
        { 'value' : 0, 'label': 'Confirmata' },
        { 'value' : 1, 'label': 'Imprumutata' },
        { 'value' : 2, 'label': 'Returnata' },
        { 'value' : 3, 'label': 'Anulata' },
      ],
    },
  ]

  booksSelectData : any = [
    {
      label: 'Cartile disponibile',
      options: [],
    },
  ]
  initialOrderBooksIds! : number[];

  constructor(
    private formBuilder: FormBuilder,
    private bookService : BookService
  ){
    this.orderForm = this.formBuilder.group({
      booksIds: [null, 
        []
      ],
      status: ['', 
        [Validators.required, Validators.pattern('^[0-9]{1}$')]
      ]
      });
  }

  get status(){
    return this.orderForm.get("status");
  }



  get isStatusTouched(){
    return this.status?.invalid && (this.status?.dirty || this.status?.touched);
  }

  get isStatusValid(){
    return this.status?.valid;
  }

  get isStatusInvalid(){
    return this.isStatusTouched && !this.isStatusValid;
  }



  private setOrderIfExists(){
    if(this.order != null){
      this.initialOrderBooksIds = this.order.books.map( book => book.bookId );
    }
  }

  private subscribeToResetForm(){    
    if(this.decideToResetFormEvent != null){            
      this.resetForm = this.decideToResetFormEvent.subscribe({
        next: next => this.orderForm.reset(),
      });
    }
  }

  ngOnInit(): void {
    this.setOrderIfExists();
    this.isDataLoaded=true;
    this.subscribeToResetForm();
  }

  private addBooksToSelectData(res : ApiResponse<Book[]>){
    const disabled = this.orderStatus >= 1 ? true : false;
    this.books$ = res.data;
    if(this.books$.length > 0) {
      this.books$.forEach( (book) => this.booksSelectData[0].options.push(
        { 'value' : book.bookId, 'label': this.bookService.getBookTitleAndAuthor(book) , 'disabled': disabled}
      ))
    }
    this.areBooksLoading=false;
    this.booksLoaded=true;
  }

  loadBooks(){
    if(this.books$ == null){
      this.areBooksLoading=true;
      this.bookService.getAllBooks().subscribe({
        next: res => this.addBooksToSelectData(res),
      })
    }
    this.displayBooks=!this.displayBooks;
  }

  onSubmit(): void {
    const orderData : OrderForm = this.orderForm.value;  
    this.orderFormEvent.emit(orderData);
  }

  ngOnDestroy() {
    if(this.decideToResetFormEvent != null){
      this.resetForm.unsubscribe();
    }
  }
}
