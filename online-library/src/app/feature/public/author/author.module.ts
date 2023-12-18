import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PublicBookModule } from "../book/book.module";
import { AuthorCardComponent } from "./author-card/author-card.component";
import { AuthorRoutingModule } from "./author-routing.module";
import { AuthorsComponent } from "./authors/authors.component";
import { SingleAuthorComponent } from "./single-author/single-author.component";

@NgModule({
  declarations: [
    AuthorsComponent,
    SingleAuthorComponent,
    AuthorCardComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FontAwesomeModule,
    PublicBookModule
  ],
  exports: [
    AuthorsComponent,
    SingleAuthorComponent,
    AuthorCardComponent
  ]
})
export class PublicAuthorModule { }
