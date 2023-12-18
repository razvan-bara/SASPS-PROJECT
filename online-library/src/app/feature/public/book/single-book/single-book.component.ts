import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@core/authentication/service/authorization.service';
import { ShoppingCartService } from '@core/cart/service/shopping-cart.service';
import { faCartPlus, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Author } from '@shared/author/Author';
import { Book } from '@shared/book/Book';
import { environment } from 'src/environment/environment';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  private id : number;
  public book : Book | null = null;
  showAuthModal : boolean = false;
  showRatingModal : boolean = false;

  faCartButton : IconDefinition;
  private faCartPlus = faCartPlus;
  private faCartCheck = faCheck;

  constructor(
    private bookService: BookService, 
    private route: ActivatedRoute,
    private shopingCartService: ShoppingCartService,
    private authorizationService : AuthorizationService
    ){
      this.id = this.route.snapshot.params['id'];
      this.faCartButton = this.faCartPlus;
  }

  public getBookAuthor(author : Author){
    return this.bookService.getBookAuthor(this.book);
  }

  ngOnInit(): void {
    this.getBook(this.id);
  }

  private getBook(bookId : number) : void{
    this.bookService.getBook(bookId).subscribe({
      next: res => this.book = res.data,
      error: err => console.log(err)
    });
    
  }

  get getImage() : string{
    let imageUrl : string = "https://bulma.io/images/placeholders/1280x960.png";
    if(this.book?.image != null && this.book.image.length > 0){
      console.log(this.book.image);
      imageUrl = environment.baseUrl + this.book.image;
    }
    
    return imageUrl;
  }

  public addToCart(){
    if(this.authorizationService.isUserLoggedIn()){
      if(this.faCartButton == this.faCartPlus){
        this.faCartButton = this.faCartCheck;
      }
      this.shopingCartService.addProduct(this.book!);
    } else {
      this.showAuthModal=true;
    }
  }

  public hideRatingModal(){
    this.showRatingModal=false;
  }

  public displayRatingModal(){
    this.showRatingModal=true;
  }

  public hideAuthModal(){
    this.showAuthModal=false;
  }
}
