import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsUserLoggedInGuard } from '@core/authentication/guards/is-user-logged-in.guard';
import { PublicComponent } from './public.component';

const routes: Routes = [{
  path: '', 
  component: PublicComponent, 
  children: [
    { 
        path: 'books',
        loadChildren: () => import('./book/book.module').then(m => m.PublicBookModule)
    },
    {
        path: 'checkout',
        canActivate: [IsUserLoggedInGuard],
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
    },
    {
      path: 'orders',
      canActivate: [IsUserLoggedInGuard],
      loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
    },
    { 
      path: 'categories',
      loadChildren: () => import('./category/category.module').then(m => m.PublicCategoryModule)
    },
    { 
      path: 'authors',
      loadChildren: () => import('./author/author.module').then(m => m.PublicAuthorModule)
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
