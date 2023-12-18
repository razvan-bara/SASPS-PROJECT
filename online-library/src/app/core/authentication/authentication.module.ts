import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { RegisterMailComponent } from './components/register-mail/register-mail.component';
import { ConfirmMailComponent } from './components/confirm-mail/confirm-mail.component';
import { StorageService } from '@core/storage/storage.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterMailComponent,
    ConfirmMailComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
