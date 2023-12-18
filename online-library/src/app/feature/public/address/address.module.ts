import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressComponent } from './components/address/address.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AddressRoutingModule
  ],
  exports: [
    AddressComponent,
    AddressFormComponent
  ]
})
export class AddressModule { }
