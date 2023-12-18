import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Author } from '@shared/author/Author';
import { AuthorService } from '../service/author.service';
import { AuthorFilter } from './AuthorFilter';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$! : Author[];
  nextAuthors$! : Author[];

  private pageNumber : number = 0;
  private queryParams : AuthorFilter = {
    "page": this.pageNumber,
    "s": ""
  }

  private nextQueryParams : AuthorFilter = {
    "page": this.pageNumber+1,
    "s": ""
  }

  error : string = "";
  hideNextPageBtn: boolean = false;

  faSearch = faSearch 

  constructor(private authorService: AuthorService){}

  ngOnInit(){
    this.fetchAuthors();
  }

  private resetQueryPage(){
    this.queryParams.page = 0;
  }

  private fetchAuthors(){
    this.fetchCurrentAuthors()
    this.fetchNextAuthors()
  }

  private handleCurrentAuthorsError(err: HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata"
      this.hideNextPageBtn = true;
    }else {
       this.error = err.error.message;
    }
  }

  private handleCurrentAuthorsSucess(res: ApiResponse<Author[]>){
    this.authors$ = res.data;
    if(this.authors$.length == 0){
     this.error = "Nu am gasit niciun autor"; 
    }
    
  }

  private fetchCurrentAuthors(){
    this.authorService.getAuthors(this.queryParams).subscribe({
      next: (res) => this.handleCurrentAuthorsSucess(res),
      error: (error) => this.handleCurrentAuthorsError(error)
      
    });
  }

  private handleNextAuthors(res : ApiResponse<Author[]>){
    this.nextAuthors$ = res.data;
    if(this.nextAuthors$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private fetchNextAuthors(){
    this.authorService.getAuthors(this.nextQueryParams).subscribe({
      next: (res) => this.handleNextAuthors(res),
      error: (error) => console.log(error)
      
    });
  }

  public searchAuthors(search : string){
    if(search.length > 2 || search.length == 0){
      search = search.trim();
      this.resetQueryPage();
      this.queryParams.s = search;
      this.nextQueryParams.s = search;
      this.fetchAuthors();
    }
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchAuthors();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }
}
