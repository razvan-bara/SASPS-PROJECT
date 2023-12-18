import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '@core/authentication/service/authentication.service';
import { AuthorizationService } from '@core/authentication/service/authorization.service';
import { ShoppingCartService } from '@core/cart/service/shopping-cart.service';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { faCartPlus, faCheck, faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Book } from '@shared/book/Book';
import { environment } from 'src/environment/environment';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnChanges {

  @Input() book : Book | null = null;
  @Output() userNotLoggedIn = new EventEmitter<boolean>(); 

  faStar = faStar;
  faCartButton : IconDefinition;
  private faCartPlus = faCartPlus;
  private faCartCheck = faCheck;

  constructor(
    private bookService : BookService,
    private shoppingCartService : ShoppingCartService,
    private authorizationService : AuthorizationService
    ){
    this.faCartButton = this.faCartPlus;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  get nonNullBook(){
    return this.book != null;
  }

  get getBookAuthor(){
    return this.bookService.getBookAuthor(this.book);
  }

  get getShortBookDescription(){
    let shortDesc = "";
    if(this.book?.description != null && this.book.description.length > 0){
      const n = 100
      shortDesc = (this.book.description.length > n) ? this.book.description.slice(0, n-1).concat("...") : this.book.description;
    }
    return shortDesc;
  }

  get getImage() : string{
    let imageUrl : string = "https://bulma.io/images/placeholders/1280x960.png";
    if(this.book?.image != null && this.book.image.length > 0){
      imageUrl = environment.baseUrl + this.book.image;
    }
    
    return imageUrl;
  }

  public addToCart(): void{
    if(this.authorizationService.isUserLoggedIn()){
      if(this.faCartButton == this.faCartPlus){
        this.faCartButton = this.faCartCheck;
      }
      this.shoppingCartService.addProduct(this.book!);
    } else {
      this.userNotLoggedIn.emit(true);
    }
  }

}
