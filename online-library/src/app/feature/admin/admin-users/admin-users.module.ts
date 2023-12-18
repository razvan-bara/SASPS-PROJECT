import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminUserFormComponent,
    AdminUsersComponent,
    AdminEditUserComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule { }
