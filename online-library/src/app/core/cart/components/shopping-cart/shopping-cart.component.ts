import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '@core/cart/service/shopping-cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnDestroy {
  faCart = faShoppingCart;

  productCount : number = 0;
  productSubscription : Subscription = new Subscription();

  constructor(
    private shoppingCartService : ShoppingCartService
  ){
    this.productSubscription = this.shoppingCartService.productCountObs$.subscribe({
      next: count => this.productCount = count,
    });
    
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
