import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCategoryRoutingModule } from './admin-category-routing.module';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminNewCategoryComponent } from './admin-new-category/admin-new-category.component';
import { AdminEditCategoryComponent } from './admin-edit-category/admin-edit-category.component';
import { AdminCategoryFormComponent } from './admin-category-form/admin-category-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminCategoriesComponent,
    AdminNewCategoryComponent,
    AdminEditCategoryComponent,
    AdminCategoryFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AdminCategoryRoutingModule
  ]
})
export class AdminCategoryModule { }
