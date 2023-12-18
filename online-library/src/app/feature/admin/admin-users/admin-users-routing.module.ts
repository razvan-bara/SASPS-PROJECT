import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';

const routes: Routes = [
  { path: '', component: AdminUsersComponent , pathMatch: 'full' },
  { path: ':id', component: AdminEditUserComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
