import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryFilter } from '@feature/public/category/categories/CategoryFilter';
import { CategoryService } from '@feature/public/category/service/category.service';
import { faAngleDown, faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Category } from '@shared/category/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  faSearch = faSearch;
  faDropdown = faAngleDown;
  faDelete = faEraser;

  public categories$ : Category[] = [];
  private nextCategories$ : Category[] = [];

  public hideNextPageBtn = false;

  public filterChoices : string[] = [];

  public pageNumber : number = 0;
  public queryParams : CategoryFilter = {
    "page": this.pageNumber,
    "s": ""
  }

  public nextQueryParams : CategoryFilter = {
    "page": this.pageNumber+1,
    "s": "",
  }
  
  error : string = "";

  public CATEGORY_KEYS = [
    "#",
    "ID Categorie",
    "Nume",
    "Descriere",
    "EDIT",
    "DELETE"
  ]

  public constructor(
    private categoryService: CategoryService, 
    private toastrService : ToastrService
    ) {}

  public searchCategories(title : string){
    this.queryParams.s = title;
    this.nextQueryParams.s = title;    
  }

  private currentCategoryPage(res : ApiResponse<Category[]>) : void{
    this.categories$ = res.data;

    if(this.queryParams.s != ""){
      this.error = "Nu am gasit categorii cu acest nume"
    }
  }

  private currentCategoryPageError(err : HttpErrorResponse) : void{
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
  }

  private nextCategoryPage(res : ApiResponse<Category[]>) : void{
    this.nextCategories$ = res.data;
    if(this.nextCategories$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private nextCategoryPageError(res : HttpErrorResponse) : void{
    console.log(res.error);
  }

  private fetchCurrentCategories(){
    this.categoryService.getAdminCategories(this.queryParams).subscribe({
      error: (err) => this.currentCategoryPageError(err),
      next: (res) => this.currentCategoryPage(res)
    });
  }

  private fetchNextCategories(){
    this.categoryService.getAdminCategories(this.nextQueryParams).subscribe({
      next: (res) => this.nextCategoryPage(res),
      error: (err) => this.nextCategoryPageError(err)
    });
  }

  private fetchCategories(){
    this.fetchCurrentCategories()
    this.fetchNextCategories()
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  public filterCategories(){
    this.fetchCategories()
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchCategories();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }

  private handleCategoryDeleteSucess(res : ApiResponse, categoryId : number){
    this.toastrService.success(res.message);
    this.categories$ = this.categories$.filter( category => category.category_id != categoryId); 
  }  
  private handleCategoryDeleteError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.warning("Nu s-a putut realiza conexiunea la server");
    }else{
      this.toastrService.warning(err.error.message);
    }
  }  

  public deleteCategoryRow(categoryId : number){  
    this.categoryService.deleteCategory(categoryId).subscribe({
      next:  res => this.handleCategoryDeleteSucess(res, categoryId),
      error: err => this.handleCategoryDeleteError(err)
    });
  }
}
