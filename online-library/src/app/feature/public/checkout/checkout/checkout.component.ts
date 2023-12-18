import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService } from '@core/cart/service/shopping-cart.service';
import { faPenAlt, faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Book } from '@shared/book/Book';
import { ToastrService } from 'ngx-toastr';
import { Checkout } from '@shared/checkout/Checkout';
import { OrderService } from '@feature/public/order/service/order.service';
import { CheckoutService } from '../service/checkout.service';
import { Order } from '@shared/order/Order';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Address } from '@shared/address/Address';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  checkoutForm : FormGroup;
  showDeliveryInfo : number = 0;
  faPenAlt = faPencilAlt;
  products : Map<number, Book>
  stripePromise = loadStripe(environment.stripe);
  address$! : Address;

  public constructor( 
    private shoppingCartService : ShoppingCartService,
    private toastrService : ToastrService,
    private formBuilder: FormBuilder,
    private checkoutService : CheckoutService,
    private router : Router
    ) {
      this.checkoutForm = this.formBuilder.group({
      withDelivery: ['0', 
        [Validators.required]
      ],
      booksIds: [[], 
        [Validators.required]
      ],
      })
      this.products = this.shoppingCartService.getProducts();
    }

  get withDelivery(){
    return this.checkoutForm.get('withDelivery')?.value;
  }

  public removeProductFromCart(book : Book){
    this.shoppingCartService.removeFromCart(book);
  }

  onDeliveryOptionChange(){    
    this.showDeliveryInfo = this.withDelivery;
  }

  private handlePickupCheckoutSuccess(res : ApiResponse<Order>){
    this.toastrService.success(res.message);
    this.shoppingCartService.emptyCart();
    this.router.navigate(["/checkout/success"]);

  }

  private handlePickupCheckoutError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.error("Nu s-a putut realiza conexiunea la server");
    }else {
      this.toastrService.error(err.error.message);
    }
  }

  private pickUpCheckout(checkoutData : Checkout){
    this.checkoutService.checkoutOrder(checkoutData).subscribe({
      next : res =>  this.handlePickupCheckoutSuccess(res),
      error : err => this.handlePickupCheckoutError(err) 
    })
  }

  async paymentCheckout(checkoutData : Checkout) : Promise<void>{
    const stripe = await this.stripePromise;

    this.checkoutService.checkoutOrderWithStripe(checkoutData).subscribe({
      next: (res) => {
        if(stripe != null){
          console.log(res.data);
          
          stripe.redirectToCheckout({
            sessionId: String(res.data.id)
          });
        }
      }
    })
  }

  public getImage(product : Book) : string{
    let imageUrl : string = "https://bulma.io/images/placeholders/1280x960.png";
    if(product.image != null && product.image.length > 0){
      console.log(product.image);
      imageUrl = environment.baseUrl + product.image;
    }
    
    return imageUrl;
  }

  submitOrder(){    
    const bookIds = Array.from(this.products.keys());    
    this.checkoutForm.get('booksIds')?.setValue(bookIds);
    const checkoutData : Checkout = this.checkoutForm.value;
    if(this.withDelivery == '0'){
      this.pickUpCheckout(checkoutData);
    }else if(this.withDelivery == '1'){
      this.paymentCheckout(checkoutData);
    }

     
  }

  setAddress(address : Address){
    this.address$ = address;
  }
}
