import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../service/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInGuard implements CanActivate {
  constructor(
    private router : Router, 
    private toastr : ToastrService,
    private authorizationService : AuthorizationService 
  ){};
  
  canActivate(): boolean {
    const isUserLoggedIn = this.authorizationService.isUserLoggedIn();
    if(isUserLoggedIn){
      return true;
    }else {
      this.toastr.warning("Login necesar");
      this.router.navigate(["/"]);
      return false;
    }
  }
  
}
