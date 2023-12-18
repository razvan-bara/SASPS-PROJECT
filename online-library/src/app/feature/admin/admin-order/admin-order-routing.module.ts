import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditOrderComponent } from './admin-edit-order/admin-edit-order.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  { path: '', component: AdminOrdersComponent , pathMatch: 'full' },
  { path: ':id', component: AdminEditOrderComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOrderRoutingModule { }
