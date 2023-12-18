import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '@core/core.module';
import { AdminBookModule } from './admin-book/admin-book.module';
import { AdminAuthorModule } from './admin-author/admin-author.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';
import { AdminOrderModule } from './admin-order/admin-order.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminHomepageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminBookModule,
    AdminAuthorModule,
    AdminCategoryModule,
    AdminOrderModule,
    CoreModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
