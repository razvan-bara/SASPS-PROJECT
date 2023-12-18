import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CategoryService } from '@feature/public/category/service/category.service';
import { Category } from '@shared/category/Category';
import { CategoryForm } from '@shared/category/CategoryForm';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-new-category',
  templateUrl: './admin-new-category.component.html',
  styleUrls: ['./admin-new-category.component.scss']
})
export class AdminNewCategoryComponent {

  error? : string;
  resetCategoryForm : Subject<Boolean> = new Subject<Boolean>();


  constructor(
    private categoryService : CategoryService,
    private toastr: ToastrService
  ){}

  private handleAddCategorySuccess(res: ApiResponse<Category>): void{
    this.toastr.success(res.message);
    this.resetCategoryForm.next(true);
  }

  private handleAddCategoryError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public addCategory(categoryData : CategoryForm){
    this.categoryService.addCategory(categoryData).subscribe({
      next: (res) => this.handleAddCategorySuccess(res),
      error: (err) => this.handleAddCategoryError(err)
    });
  }

}
