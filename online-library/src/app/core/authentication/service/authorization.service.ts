import { Injectable } from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import jwt_decode from "jwt-decode";
import { JwtInterface } from '../jwt/JwtInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private storageService: StorageService) {}

  private isTokenExpired(payload : JwtInterface) : boolean {
    return Date.now() > payload.exp;
  }

  public isAdmin(): boolean {
    const token : string | null = this.storageService.getAccessToken();
    
    if(token == null){
      return false
    }

    const payload : JwtInterface = jwt_decode(token);
    return payload.isAdmin;
  }

  public isUserLoggedIn() : boolean {
    const token : string | null = this.storageService.getAccessToken();

    if(token == null){
      return false
    }

    const payload : JwtInterface = jwt_decode(token);
    return this.isTokenExpired(payload);

  }
}
