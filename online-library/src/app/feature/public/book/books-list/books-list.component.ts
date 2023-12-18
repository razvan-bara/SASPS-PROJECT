import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthorService } from '@feature/public/author/service/author.service';
import { CategoryService } from '@feature/public/category/service/category.service';
import { Author } from '@shared/author/Author';
import { Book } from '@shared/book/Book';
import { Category } from '@shared/category/Category';
import { lastValueFrom } from 'rxjs';
import { BookService } from '../service/book.service';
import { BookFilter } from './BookFilter';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit{

  @Input() title! : string;
  @Input() subtitle! : string;
  @Input() authorId! : number;
  @Input() categoryId! : number;
  
  public books$ : Book[] = [];
  public categories$: Category[] = []; 
  public authorsData$: Author[] = []; 
  private nextBooks$ : Book[] = [];

  public hideNextPageBtn = false;

  public categoryChoices : Map<number, boolean> = new Map([]);
  public categoryArray : number[] = [];

  public pageNumber : number = 0;
  public queryParams : BookFilter = {
    "page": this.pageNumber,
    "s": "",
    "categories": [],
    "authors": 0
  }

  public nextQueryParams : BookFilter = {
    "page": this.pageNumber+1,
    "s": "",
    "categories": [],
    "authors": 0
  }

  authorsSelect2 : any = [
    {
      label: 'Autori disponibili',
      options: [],
    },
  ]

  error : string = "";
  loadingAuthors : boolean = false;
  showModal : boolean = false;

  public constructor(private bookService: BookService, private categoryService: CategoryService, private authorService : AuthorService) {}



  private currentBookPage(res : ApiResponse<Book[]>) : void{
    this.books$ = res.data;
    if(this.nextBooks$.length <= 0){
      this.error = "Nu exista carti disponibile";
    }

    if(this.authorId){
      this.error = "Acest autor nu are carti disponibile";
    }

    if(this.categoryId){
      this.error = "Nu exista carti sub aceasta categorie";
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
    this.bookService.getBooks(this.queryParams).subscribe({
      error: (err) => this.currentBookPageError(err),
      next: (res) => this.currentBookPage(res)
    });
  }

  private fetchNextBooks(){
    this.bookService.getBooks(this.nextQueryParams).subscribe({
      error: (err) => this.nextBookPageError(err),
      next: (res) => this.nextBookPage(res)
    });
  }

  private fetchBooks(){
    this.fetchCurrentBooks()
    this.fetchNextBooks()
  }

  private fetchCategories(){
    if(!this.categoryId){
      this.categoryService.getCategories().subscribe({
        next: (res) => this.categories$ = res.data,
        error: (err) => console.log(err)
      })
    }
  }

  private async fetchAuthors(){
    if(this.authorId != null){
      return;
    }
    const obs$ = this.authorService.getAllAuthors();
    const res = await lastValueFrom(obs$);
    if(res.data.length > 0){
      this.authorsSelect2[0].options.push(
        { 'value' : 0, 'label': `Niciun autor`}
      );
      res.data.forEach( (author) =>  this.authorsSelect2[0].options.push(
        { 'value' : author.authorId, 'label': `${author.first_name+" "+author.last_name}`}
      ));
    }else{
      this.authorsSelect2[0].options.push(
        { 'value' : 0, 'label': 'Nu exista niciun autor disponibil', 'disabled': true }
      );
    }
    this.loadingAuthors = true;
  }

  private resetQueryPage(){
    this.queryParams.page = 0;
    this.nextQueryParams.page = 1;
  }

  private setDefaultCategory(){
    if(this.categoryId){
      this.categoryChoices.set(this.categoryId, true);
      this.queryParams.categories.push(this.categoryId);
      this.nextQueryParams.categories.push(this.categoryId);
    }
  }

  ngOnInit(): void {
    this.queryParams.authors = this.authorId;
    this.nextQueryParams.authors = this.authorId;  
    this.fetchAuthors();
    this.setDefaultCategory();
    this.fetchBooks();
    this.fetchCategories();
  }

  public searchBooks(search : string){
    if(search.length > 2 || search.length == 0){
      search = search.trim();
      this.resetQueryPage();
      this.queryParams.s = search;
      this.nextQueryParams.s = search;
      this.fetchBooks();
    }
  }

  public onCheckChange(event : any){
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
    this.resetQueryPage();
    this.fetchBooks();
  }

  updateAuthorForQuery(event : any){
    this.queryParams.authors = event.value;
    this.nextQueryParams.authors = event.value;
    this.fetchBooks();
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchBooks();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }

  public fireAuthenticationModal(userIsNoLoggedIn : boolean){
    if(userIsNoLoggedIn){
      this.showModal = true;
    }
  }

  public hideModal(){
    this.showModal = false;
  }
}
