import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "@core/core.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PublicAuthorModule } from "./author/author.module";
import { PublicBookModule } from "./book/book.module";
import { PublicCategoryModule } from "./category/category.module";
import { HomepageComponent } from "./homepage/components/homepage.component";
import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";

@NgModule({
  declarations: [
    PublicComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PublicRoutingModule,
    PublicBookModule,
    PublicAuthorModule,
    PublicCategoryModule,
    FontAwesomeModule
  ],
  exports: [
    PublicComponent,
    HomepageComponent
  ]
})
export class PublicModule { }
