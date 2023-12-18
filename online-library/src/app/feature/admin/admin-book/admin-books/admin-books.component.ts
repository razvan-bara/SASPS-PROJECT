import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '@feature/public/author/service/author.service';
import { BookFilter } from '@feature/public/book/books-list/BookFilter';
import { BookService } from '@feature/public/book/service/book.service';
import { CategoryService } from '@feature/public/category/service/category.service';
import { faAngleDown, faCross, faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Author } from '@shared/author/Author';
import { Book } from '@shared/book/Book';
import { Category } from '@shared/category/Category';
import { ToastrService } from 'ngx-toastr';
import { AdminBookFilter } from './AdminBookFilter';


@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss']
})
export class AdminBooksComponent implements OnInit{

  faSearch = faSearch;
  faDropdown = faAngleDown;
  faDelete = faEraser;

  public books$ : Book[] = [];
  public categories$: Category[] = []; 
  public authors$: Author[] = [];
  private nextBooks$ : Book[] = [];

  public hideNextPageBtn = false;

  public categoryChoices : Map<number, boolean> = new Map([]);
  public categoryArray : number[] = [];

  public authorChoices : Map<number, boolean> = new Map([]);
  public authorArray : number[] = [];

  public filterChoices : string[] = [];

  public pageNumber : number = 0;
  public queryParams : AdminBookFilter = {
    "page": this.pageNumber,
    "s": "",
    "categories": [],
    "authors": []
  }

  public nextQueryParams : AdminBookFilter = {
    "page": this.pageNumber+1,
    "s": "",
    "categories": [],
    "authors": []
  }
  
  error : string = "";

  public BOOK_KEYS = [
    "#",
    "ID Carte",
    "Titlu",
    "Descriere",
    "ISBN",
    "An publicare",
    "Numar de pagini",
    "In stoc",
    "Autor",
    "Categorii",
    "Avg Rating",
    "Nr Ratinguri",
    "EDIT",
    "DELETE"
  ]

  public constructor(private bookService: BookService, private categoryService: CategoryService, private authorService : AuthorService,
    private toastrService : ToastrService) {}

  public searchBooks(title : string){
    this.queryParams.s = title;
    this.nextQueryParams.s = title;    
  }

  public onCheckCategories(event : any){
    const value = event.target.value;
    
    if(!this.categoryChoices.has(value) || this.categoryChoices.get(value) == false){
      this.categoryChoices.set(value,true);
    } else {
      this.categoryChoices.set(value,false);
    }
     
    this.categoryArray = [];
    this.categoryChoices.forEach((isChecked, key) => {
      if(isChecked){
        this.categoryArray.push(key);
      }
    });
    this.queryParams.categories = this.categoryArray;
    this.nextQueryParams.categories = this.categoryArray;
  }

  public onCheckAuthors(event : any){
    const value = event.target.value;
    
    if(!this.authorChoices.has(value) || this.authorChoices.get(value) == false){
      this.authorChoices.set(value,true);
    } else {
      this.authorChoices.set(value,false);
    }
     
    this.authorArray = [];
    this.authorChoices.forEach((isChecked, key) => {
      if(isChecked){
        this.authorArray.push(key);
      }
    });

    this.queryParams.authors = this.authorArray;
    this.nextQueryParams.authors = this.authorArray;
    
  }


  private currentBookPage(res : ApiResponse<Book[]>) : void{
    this.books$ = res.data;
    if(this.nextBooks$.length <= 0){
      this.error = "Nu exista carti disponibile";
    }

    if(this.queryParams.s != ""){
      this.error = "Nu am gasit carti cu acest titlu"
    }
  }

  private currentBookPageError(err : HttpErrorResponse) : void{
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
  }

  private nextBookPage(res : ApiResponse<Book[]>) : void{
    this.nextBooks$ = res.data;
    if(this.nextBooks$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private nextBookPageError(res : HttpErrorResponse) : void{
    console.log(res.error);
  }

  private fetchCurrentBooks(){
    this.bookService.getAdminBooks(this.queryParams).subscribe({
      error: (err) => this.currentBookPageError(err),
      next: (res) => this.currentBookPage(res)
    });
  }

  private fetchNextBooks(){
    this.bookService.getAdminBooks(this.nextQueryParams).subscribe({
      error: (err) => this.nextBookPageError(err),
      next: (res) => this.nextBookPage(res)
    });
  }

  private fetchBooks(){
    this.fetchCurrentBooks()
    this.fetchNextBooks()
  }

  private fetchCategories(){
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories$ = res.data,
      error: (err) => console.log(err)
    })
  }

  private fetchAuthors(){
    this.authorService.getAllAuthors().subscribe({
      next: (res) => this.authors$ = res.data,
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchBooks();
    this.fetchAuthors();
  }

  public filterBooks(){
    this.fetchBooks()
    
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchBooks();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }

  getBookAuthor(book : Book){
    return this.bookService.getBookAuthor(book);
  }

  getShortBookDescription(book : Book){
    let shortDesc = "";
    if(book?.description != null && book.description.length > 0){
      const n = 100
      shortDesc = (book.description.length > n) ? book.description.slice(0, n-1).concat("...") : book.description;
    }
    console.log(shortDesc);
    
    return shortDesc;
  }

  private handleBookDeleteSucess(res : ApiResponse, bookId : number){
    this.toastrService.success(res.message);
    this.books$ = this.books$.filter( book => book.bookId != bookId); 
  }  
  private handleBookDeleteError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.warning("Nu s-a putut realiza conexiunea la server");
    }else{
      this.toastrService.warning(err.error.message);
    }
  }  

  public deleteBookRow(bookId : number){  
    this.bookService.deleteBook(bookId).subscribe({
      next:  res => this.handleBookDeleteSucess(res, bookId),
      error: err => this.handleBookDeleteError(err)
    });
  }
}
