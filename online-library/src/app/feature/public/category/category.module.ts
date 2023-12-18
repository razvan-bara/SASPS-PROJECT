import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PublicBookModule } from "../book/book.module";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryCardComponent } from "./category-card/category-card.component";
import { CategoryRoutingModule } from "./category-routing.module";
import { SingleCategoryComponent } from "./single-category/single-category.component";

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCardComponent,
    SingleCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FontAwesomeModule,
    PublicBookModule
  ],
  exports: [
    CategoriesComponent,
    CategoryCardComponent,
    SingleCategoryComponent
  ]
})
export class PublicCategoryModule { }
