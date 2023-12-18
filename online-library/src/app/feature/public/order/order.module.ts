import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddressModule } from '../address/address.module';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AddressModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
