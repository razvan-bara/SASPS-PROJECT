import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checkout } from '@shared/checkout/Checkout';
import { Order } from '@shared/order/Order';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { environment } from 'src/environment/environment';


const BANI = 100;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http : HttpClient) { }

  public checkoutOrder(checkoutData : Checkout){
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.CHECKOUT}`;
    return this.http.post<ApiResponse<Order>>(url, checkoutData);
  }

  public checkoutOrderWithStripe(checkoutData : Checkout){    
    const paymentCheckout = {
      currency: 'ron',
      amount: 20*BANI,
      quantity: 1,
      withDelivery : 1,
      booksIds: checkoutData.booksIds,
      cancelUrl: 'http://localhost:4200/checkout/cancel',
      successUrl: 'http://localhost:4200/checkout/success',
    }
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.CHECKOUT_PAYMENT}`;
    return this.http.post<any>(url, paymentCheckout);
  }

  public confirmCheckoutPayment(orderToken : string){
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.CONFIRM_CHECKOUT_PAYMENT}`;
    return this.http.put<ApiResponse<Order>>(url, orderToken);
  }
}
