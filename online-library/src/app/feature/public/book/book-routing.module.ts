import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { SingleBookComponent } from './single-book/single-book.component';

const routes: Routes = [
  { path: ':id', component: SingleBookComponent, pathMatch: 'full' },
  { path: '', component: BooksComponent , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
