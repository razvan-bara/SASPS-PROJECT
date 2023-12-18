import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmMailComponent } from './components/confirm-mail/confirm-mail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterMailComponent } from './components/register-mail/register-mail.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mail', component: RegisterMailComponent },
  { path: 'confirm_email/:token', component: ConfirmMailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
