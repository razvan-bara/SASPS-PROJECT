import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartComponent } from '@core/cart/components/shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '@core/cart/service/shopping-cart.service';
import { Order } from '@shared/order/Order';
import { CheckoutService } from '../service/checkout.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit{

  dataLoaded : boolean = false;
  hasSuccess : boolean = true;
  errorMsg : string = "";

  constructor(
    private shoppingCartService : ShoppingCartService,
    private checkoutService: CheckoutService,
    private route : ActivatedRoute,
    private router: Router
  ){}

    private handleConfirmPaymentCheckoutSuccess(res : ApiResponse<Order>) {
      this.shoppingCartService.emptyCart();
    }

    private handleConfirmPaymentCheckoutError(err : HttpErrorResponse){
      if(err.status == 0){
        this.errorMsg = "Comanda ta nu a putut fi confirmata";
      } else {
        this.errorMsg = err.error.message;
      }
      this.hasSuccess=false;
    }

  ngOnInit(): void {
    const orderToken = this.route.snapshot.queryParamMap.get('orderId');
    console.log(orderToken);
    if(orderToken != null){
      this.checkoutService.confirmCheckoutPayment(orderToken).subscribe({
        next : res => this.handleConfirmPaymentCheckoutSuccess(res),
        error : err => this.handleConfirmPaymentCheckoutError(err)
      })
    }
    this.dataLoaded = true;
  }
}
