import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminEditBookComponent } from './admin-edit-book/admin-edit-book.component';
import { AdminNewBookComponent } from './admin-new-book/admin-new-book.component';


const routes: Routes = [
  { path: '', component: AdminBooksComponent , pathMatch: 'full' },
  { path: 'new', component: AdminNewBookComponent, pathMatch: 'full'},
  { path: ':id', component: AdminEditBookComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBookRoutingModule { }
