import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { isAdminGuard } from '@core/authentication/guards/is-admin.guard';


const routes: Routes = [{
  path: 'admin', 
  component: AdminComponent,
  canActivate:[isAdminGuard],
  children: [
    { 
        path: 'books',
        loadChildren: () => import('./admin-book/admin-book.module').then(m => m.AdminBookModule)
    },
    { 
      path: 'authors',
      loadChildren: () => import('./admin-author/admin-author.module').then(m => m.AdminAuthorModule)
    },
    { 
      path: 'categories',
      loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule)
    },
    { 
      path: 'orders',
      loadChildren: () => import('./admin-order/admin-order.module').then(m => m.AdminOrderModule)
    },
    { 
      path: 'users',
      loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule)
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
