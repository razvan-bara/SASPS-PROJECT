import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { SingleAuthorComponent } from './single-author/single-author.component';

const routes: Routes = [
  { path: ':id', component: SingleAuthorComponent, pathMatch: 'full' },
  { path: '', component: AuthorsComponent , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
