import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { AddressModule } from '../address/address.module';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSuccessComponent,
    CheckoutCancelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AddressModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
