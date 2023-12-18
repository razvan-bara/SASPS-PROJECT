import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent , pathMatch: 'full'},
  { path: 'success', component: CheckoutSuccessComponent , pathMatch: 'full'},
  { path: 'cancel', component: CheckoutCancelComponent , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
