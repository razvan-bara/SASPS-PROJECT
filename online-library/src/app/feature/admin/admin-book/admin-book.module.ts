import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBookRoutingModule } from './admin-book-routing.module';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminNewBookComponent } from './admin-new-book/admin-new-book.component';
import { AdminBookFormComponent } from './admin-book-form/admin-book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { AdminEditBookComponent } from './admin-edit-book/admin-edit-book.component';


@NgModule({
  declarations: [
    AdminBooksComponent,
    AdminNewBookComponent,
    AdminBookFormComponent,
    AdminEditBookComponent
  ],
  imports: [
    CommonModule,
    AdminBookRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module
  ],
  exports: [
    AdminBooksComponent
  ]
})
export class AdminBookModule { }
