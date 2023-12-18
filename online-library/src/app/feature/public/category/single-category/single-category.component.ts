import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@shared/category/Category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  public category$! : Category;
  public id : number;
  public error! : string;
  public title! : string;
  public subtitle! : string;

  constructor(
    private categoryService : CategoryService,
    private route: ActivatedRoute,
    private router: Router
    ){
       this.id = this.route.snapshot.params['id'];
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    private handleCategorySuccess(res : ApiResponse<Category>){
      this.category$ = res.data;
      const title = `${this.category$.title}`;
      this.title = title;
      this.subtitle = `Cartile din categoria ${title}`;
    }

    private handleCategoryError(err : HttpErrorResponse){
      
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
    }

  private getCategory(CategoryId : number){
    this.categoryService.getCategory(CategoryId).subscribe({
      next: res => this.handleCategorySuccess(res),
      error: err => this.handleCategoryError(err)
    })
  }

  ngOnInit(): void {
    this.getCategory(this.id);
  }

}
