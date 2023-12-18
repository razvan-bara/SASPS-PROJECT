import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorFilter } from '@feature/public/author/authors/AuthorFilter';
import { AuthorService } from '@feature/public/author/service/author.service';
import { faAngleDown, faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Author } from '@shared/author/Author';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.scss']
})
export class AdminAuthorsComponent implements OnInit {
  faSearch = faSearch;
  faDropdown = faAngleDown;
  faDelete = faEraser;

  public authors$ : Author[] = [];
  private nextAuthors$ : Author[] = [];

  public hideNextPageBtn = false;

  public categoryChoices : Map<number, boolean> = new Map([]);
  public categoryArray : number[] = [];

  public authorChoices : Map<number, boolean> = new Map([]);
  public authorArray : number[] = [];

  public filterChoices : string[] = [];

  public pageNumber : number = 0;
  public queryParams : AuthorFilter = {
    "page": this.pageNumber,
    "s": "",
    "withBooks": 1
  }

  public nextQueryParams : AuthorFilter = {
    "page": this.pageNumber+1,
    "s": "",
  }
  
  displayDeleteModal : boolean = false;
  authorToDelete! : Author;
  error : string = "";

  public AUTHOR_KEYS = [
    "#",
    "ID Author",
    "Prenume",
    "Nume de familie",
    "Carti inregistrate",
    "EDIT",
    "DELETE"
  ]

  public constructor(
    private authorService: AuthorService, 
    private toastrService : ToastrService
    ) {}

  public searchAuthors(title : string){
    this.queryParams.s = title;
    this.nextQueryParams.s = title;    
  }

  private currentAuthorPage(res : ApiResponse<Author[]>) : void{
    this.authors$ = res.data;
    if(this.nextAuthors$.length <= 0){
      this.error = "Nu exista autori disponibili";
    }

    if(this.queryParams.s != ""){
      this.error = "Nu am gasit autori cu acest nume"
    }
  }

  private currentAuthorPageError(err : HttpErrorResponse) : void{
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
  }

  private nextAuthorPage(res : ApiResponse<Author[]>) : void{
    this.nextAuthors$ = res.data;
    if(this.nextAuthors$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private nextAuthorPageError(res : HttpErrorResponse) : void{
    console.log(res.error);
  }

  private fetchCurrentAuthors(){
    this.authorService.getAdminAuthors(this.queryParams).subscribe({
      error: (err) => this.currentAuthorPageError(err),
      next: (res) => this.currentAuthorPage(res)
    });
  }

  private fetchNextAuthors(){
    this.authorService.getAdminAuthors(this.nextQueryParams).subscribe({
      next: (res) => this.nextAuthorPage(res),
      error: (err) => this.nextAuthorPageError(err)
    });
  }

  private fetchAuthors(){
    this.fetchCurrentAuthors()
    this.fetchNextAuthors()
  }

  ngOnInit(): void {
    this.fetchAuthors();
  }

  public filterAuthors(){
    this.fetchAuthors()
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchAuthors();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }

  private handleAuthorDeleteSucess(res : ApiResponse, authorId : number){
    this.toastrService.success(res.message);
    this.authors$ = this.authors$.filter( author => author.authorId != authorId); 
  }  
  private handleAuthorDeleteError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.warning("Nu s-a putut realiza conexiunea la server");
    }else{
      this.toastrService.warning(err.error.message);
    }
  }  

  public deleteAuthorRow(author : Author, confirmDelete : boolean = false){  
    const authorId = author.authorId;

    if(author.bookCount && !confirmDelete){
      this.authorToDelete = author;
      this.displayDeleteModal = true;
    } else {
      this.authorService.deleteAuthor(authorId).subscribe({
        next:  res => this.handleAuthorDeleteSucess(res, authorId),
        error: err => this.handleAuthorDeleteError(err)
      });
    }
  }

  public handleAuthorDelete(toDelete : boolean){

    if(this.authorToDelete == null){
      return;
    }

    if(toDelete){
      this.deleteAuthorRow(this.authorToDelete, toDelete);
      this.displayDeleteModal = false;
    } else {
      this.displayDeleteModal = false;
    }
  }
}
