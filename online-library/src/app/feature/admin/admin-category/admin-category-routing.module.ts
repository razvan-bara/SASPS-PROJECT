import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminEditCategoryComponent } from './admin-edit-category/admin-edit-category.component';
import { AdminNewCategoryComponent } from './admin-new-category/admin-new-category.component';

const routes: Routes = [
  { path: '', component: AdminCategoriesComponent , pathMatch: 'full' },
  { path: 'new', component: AdminNewCategoryComponent, pathMatch: 'full'},
  { path: ':id', component: AdminEditCategoryComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCategoryRoutingModule { }
