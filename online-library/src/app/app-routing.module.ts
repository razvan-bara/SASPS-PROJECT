import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard } from '@core/authentication/guards/is-admin.guard';
import { AdminComponent } from '@feature/admin/admin.component';
import { PublicComponent } from '@feature/public/public.component';

const routes: Routes = [
  { path: '', component: PublicComponent },
  { path: 'admin', component: AdminComponent, canActivate:[isAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
