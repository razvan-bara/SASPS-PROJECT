import { Injectable } from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import { Book } from '@shared/book/Book';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShoppingCartService {

  private products : Map<number, Book>;

  private productCountSubject : BehaviorSubject<number> = new BehaviorSubject(0);
  public productCountObs$ = this.productCountSubject.asObservable();

  constructor(
    private localStorage : StorageService,
    private toastrService : ToastrService
    ) {
      this.products = this.localStorage.getProducts();    
      const productCount = this.getProductCount();
      this.setProductCount(productCount);
     }

  public addProduct(book : Book){
    
    if(this.products.has(book.bookId)){
      this.toastrService.info(
        `Cartea ${book.title} deja exista in cos!`,
        "Carte unica in cos"
      );
    } else{
      this.products.set(book.bookId, book);
      this.localStorage.saveProducts(this.products);
      this.setProductCount(this.productCountSubject.value + 1);
      this.toastrService.success("Carte adaugata in cos");
    }
    
  }

  public removeFromCart(book : Book){
    if(this.products.has(book.bookId)){
      this.products.delete(book.bookId);
      this.localStorage.saveProducts(this.products);
      this.toastrService.error(
        "Cartea a fost stearsa din cos"
      );
      this.setProductCount(this.productCountSubject.value - 1);
    }
  }

  public getProducts() : Map<number, Book> {
    return this.products;
  }

  public getProductCount(){
    return this.products.size;
  }

  public setProductCount(productCount : number){  
    this.productCountSubject.next(productCount);
  }

  public emptyCart(){
    this.products = new Map<number, Book>();
    this.setProductCount(0);
    this.localStorage.removeAllProducts();
  }
}
