import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from '@core/storage/storage.service';


const protectedRoutes : string[] = [
  "login",
  "register",
  "mail",
  "confirm_email"
]

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(private route: Router, private storageService: StorageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const route : string = this.route.url.split("/",3)[1];    

    if(protectedRoutes.findIndex( (protectedRoute) => protectedRoute === route ) != -1){
      console.log("NO NEED FOR TOKEN");
      return next.handle(req);
    }

    const authToken : string | null = this.storageService.getAccessToken();
  
    if(authToken != null || route.startsWith("/admin")){
      console.log("NEED TOKEN");
      const bearerToken = "Bearer " + authToken;
      const authReq = req.clone({ setHeaders: { Authorization: bearerToken } });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
