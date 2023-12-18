import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@feature/public/category/service/category.service';
import { Category } from '@shared/category/Category';
import { CategoryForm } from '@shared/category/CategoryForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-category',
  templateUrl: './admin-edit-category.component.html',
  styleUrls: ['./admin-edit-category.component.scss']
})
export class AdminEditCategoryComponent implements OnInit {

  category$! : Category;
  error : string = "";
  private id : number;


  constructor(
    private categoryService : CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
    this.id = this.route.snapshot.params['id'];
  }

  private handleCategorySucess(res : ApiResponse<Category>){
    this.category$ = res.data;
  }

  private handleCategoryError(err : HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata";
    } else {
      this.error = err.error.message;
    }
  }

  private fetchCategory(categoryId : number){
    this.categoryService.getCategory(categoryId).subscribe({
      next: res => this.handleCategorySucess(res),
      error: err => this.handleCategoryError(err)
    })
  }

  ngOnInit(): void {
    this.fetchCategory(this.id);
  }

  private handleUpdateCategorySuccess(res: ApiResponse<Category>): void{
    this.toastr.success(res.message);
    this.router.navigate(['/admin/categories']);
  }

  private handleUpdateCategoryError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public updateCategories(categoryData : CategoryForm){
    this.categoryService.updateCategory(categoryData, this.id).subscribe({
      next: (res) => this.handleUpdateCategorySuccess(res),
      error: (err) => this.handleUpdateCategoryError(err)
    });
  }
}
