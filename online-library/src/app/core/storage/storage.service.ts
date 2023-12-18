import { Injectable, OnDestroy } from '@angular/core';
import { Book } from '@shared/book/Book';
import { Observable, Subject } from 'rxjs';

const JWT_KEY = 'JWT_TOKEN';
const JWT_REFRESH_KEY = 'JWT_REFRESH';
const PRODUCTS = 'PRODUCTS';

@Injectable()
export class StorageService implements OnDestroy {


  private loggedIn = false;
  private logger = new Subject<boolean>;
  private localStorage = window.localStorage;

  ngOnDestroy(): void {
    this.stop();
  }

  public logOut(): void {
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
    this.localStorage.clear();
  }

  public saveTokens(response: ApiResponse): void {
    this.localStorage.removeItem(JWT_KEY);
    this.localStorage.removeItem(JWT_REFRESH_KEY);
    this.localStorage.setItem(JWT_KEY, response.data.access_token);
    this.localStorage.setItem(JWT_REFRESH_KEY, response.data.refresh_token);
    this.loggedIn = true;
    this.logger.next(this.loggedIn);
  }

  public getAccessToken() : string | null {
    return this.localStorage.getItem(JWT_KEY);
  }

  public getRefreshToken(): string | null {
    return this.localStorage.getItem(JWT_REFRESH_KEY);
  }

  public getTokens(): Map<string, string> | null {
    
    const jwt_token : string | null = this.getAccessToken();
    const refresh_token : string | null = this.getRefreshToken();
    
    let tokens : Map<string, string> = new Map<string, string>();
    if(jwt_token != null && refresh_token != null){
      tokens.set(JWT_KEY, jwt_token);
      tokens.set(JWT_REFRESH_KEY, refresh_token);
      return tokens;
    }

    return null;
  }

  public isLoggedIn(): boolean {

    let bool : boolean = false;
    if(this.getTokens()){
      bool = true;
    }

    this.loggedIn = bool;
    this.logger.next(bool);
    return bool;
  }

  public watchLogin(): Observable<boolean> {
    return this.logger.asObservable();
  }

  public stop(): void{
    this.logger.complete();
  }

  public getProducts(){
    const productsFromStorage = this.localStorage.getItem(PRODUCTS);
    if(productsFromStorage != null){
      return new Map<number,Book>(JSON.parse(productsFromStorage));
    } else {
      return new Map<number,Book>();
    }
  }

  public saveProducts(products : Map<number, Book>){
    const productsToStore = JSON.stringify(Array.from(products.entries()));
    this.localStorage.setItem(PRODUCTS, productsToStore);
  }

  public removeAllProducts(){
    this.localStorage.removeItem(PRODUCTS);
  }
}