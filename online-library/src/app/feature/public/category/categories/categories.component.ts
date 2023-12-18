import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Category } from '@shared/category/Category';
import { CategoryService } from '../service/category.service';
import { CategoryFilter } from './CategoryFilter';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$! : Category[];
  nextCategories$! : Category[];

  private pageNumber : number = 0;
  private queryParams : CategoryFilter = {
    "page": this.pageNumber,
    "s": ""
  }

  private nextQueryParams : CategoryFilter = {
    "page": this.pageNumber+1,
    "s": ""
  }

  error : string = "";
  hideNextPageBtn: boolean = false;

  faSearch = faSearch 

  constructor(private categoryService: CategoryService){}

  ngOnInit(){
    this.fetchCategories();
  }

  private resetQueryPage(){
    this.queryParams.page = 0;
  }

  private fetchCategories(){
    this.fetchCurrentCategories()
    this.fetchNextCategories()
  }

  private handleCurrentCategoriesError(err: HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata"
      this.hideNextPageBtn = true;
    }else {
       this.error = err.error.message;
    }
  }

  private handleCurrentCategoriesSucess(res: ApiResponse<Category[]>){
    this.categories$ = res.data;
    if(this.categories$.length == 0){
     this.error = "Nu am gasit nicio categorie"; 
    }
    
  }

  private fetchCurrentCategories(){
    this.categoryService.getCategoriesSortedAndPageable(this.queryParams).subscribe({
      next: (res) => this.handleCurrentCategoriesSucess(res),
      error: (error) => this.handleCurrentCategoriesError(error)
      
    });
  }

  private handleNextCategories(res : ApiResponse<Category[]>){
    this.nextCategories$ = res.data;
    if(this.nextCategories$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private fetchNextCategories(){
    this.categoryService.getCategoriesSortedAndPageable(this.nextQueryParams).subscribe({
      next: (res) => this.handleNextCategories(res),
      error: (error) => console.log(error)
      
    });
  }

  public searchCategories(search : string){
    if(search.length > 2 || search.length == 0){
      search = search.trim();
      this.resetQueryPage();
      this.queryParams.s = search;
      this.nextQueryParams.s = search;
      this.fetchCategories();
    }
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchCategories();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }


}
