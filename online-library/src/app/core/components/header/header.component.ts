import { Component, Inject, Input, OnInit } from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import { AuthenticationService } from '@core/authentication/service/authentication.service';
import { faChevronCircleLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { AuthorizationService } from '@core/authentication/service/authorization.service';
import { ShoppingCartService } from '@core/cart/service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobile : boolean = false;
  isEnabled : boolean = false;
  hasAuth : boolean = false;
  isAdmin: boolean = false;
  activeDropDown : boolean = false;
  faUser = faUser;
  faLogout = faChevronCircleLeft

  constructor(
    @Inject(StorageService) private storageService: StorageService,
    private authorizationService : AuthorizationService,
    private router : Router,
    private shoopingCartService : ShoppingCartService
  ){}

  ngOnInit() {
    this.storageService.watchLogin().subscribe(status => {
      this.hasAuth = status;
    });
    this.storageService.isLoggedIn();
    this.isAdmin = this.authorizationService.isAdmin();
  }

  navItems: Array<String> = new Array<String>(
    'Carti',
    'Autori',
    'Cateogrii'
  );

  routes: Array<String> = new Array<String>(
    '/books',
    '/authors',
    '/categories'
  );
  
  public toggleMobileMenu() : void {
    this.isMobile = !this.isMobile;
  }

  public toggleDropDownMenu(){
    if(this.hasAuth){
      this.activeDropDown = !this.activeDropDown;
    }
  } 

  public activateDropDown(){
    if(this.hasAuth && !this.isMobile){
      this.activeDropDown = true;
    }
  }

  public deactivateDropDown(){
    if(this.hasAuth && !this.isMobile){
      this.activeDropDown = false;
    }
  }

  public logout(){
    this.storageService.logOut();
    this.router.navigate(['/']);
    this.shoopingCartService.emptyCart();
  }

}
