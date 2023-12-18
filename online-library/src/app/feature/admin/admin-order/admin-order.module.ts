import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderRoutingModule } from './admin-order-routing.module';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminEditOrderComponent } from './admin-edit-order/admin-edit-order.component';
import { AdminOrderFormComponent } from './admin-order-form/admin-order-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminEditOrderComponent,
    AdminOrderFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    Select2Module,
    AdminOrderRoutingModule
  ]
})
export class AdminOrderModule { }
