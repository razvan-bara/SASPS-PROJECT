import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthorsComponent } from './admin-authors/admin-authors.component';
import { AdminEditAuthorComponent } from './admin-edit-author/admin-edit-author.component';
import { AdminNewAuthorComponent } from './admin-new-author/admin-new-author.component';

const routes: Routes = [
  { path: '', component: AdminAuthorsComponent , pathMatch: 'full' },
  { path: 'new', component: AdminNewAuthorComponent, pathMatch: 'full'},
  { path: ':id', component: AdminEditAuthorComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthorRoutingModule { }
