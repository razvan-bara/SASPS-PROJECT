import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../service/authorization.service';

@Injectable()
export class isAdminGuard implements CanActivate {

  constructor(
    private router : Router, 
    private toastr : ToastrService,
    private authorizationService : AuthorizationService 
  ){};
  
  canActivate(): boolean {
    const isAdmin = this.authorizationService.isAdmin();
    if(isAdmin){
      return true;
    }else {
      this.router.navigate(["/"]);
      this.toastr.warning("Autorizare insuficienta")
      return false;
    }
  }
  
}
