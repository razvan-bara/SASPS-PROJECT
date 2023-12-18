import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { Select2Module } from "ng-select2-component";
import { BookCardComponent } from "./book-card/book-card.component";
import { BookRoutingModule } from "./book-routing.module";
import { BooksListComponent } from "./books-list/books-list.component";
import { BooksComponent } from "./books/books.component";
import { SingleBookComponent } from "./single-book/single-book.component";

@NgModule({
    declarations: [
      BooksComponent,
      SingleBookComponent,
      BookCardComponent,
      BooksListComponent
    ],
    imports: [
      CommonModule,
      BookRoutingModule,
      FontAwesomeModule,
      Select2Module,
      SharedModule
    ],
    exports: [
     BooksComponent,
     SingleBookComponent,
     BookCardComponent,
     BooksListComponent
    ]
  })
  export class PublicBookModule { }