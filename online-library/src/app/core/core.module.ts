import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@core/components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StorageService } from './storage/storage.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { httpInterceptorProviders } from './interceptor';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { isAdminGuard } from './authentication/guards/is-admin.guard';
import { ShoppingCartComponent } from './cart/components/shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './cart/service/shopping-cart.service';


@NgModule({
  declarations: [
    HeaderComponent,
    AdminHeaderComponent,
    ShoppingCartComponent, 
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    FontAwesomeModule
  ],
  exports:[
    HeaderComponent,
    AdminHeaderComponent
  ],
  providers: [ // singleton services
    StorageService,
    ShoppingCartService,
    httpInterceptorProviders,
    isAdminGuard
  ]
})
export class CoreModule { }
