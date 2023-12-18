import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthorRoutingModule } from './admin-author-routing.module';
import { AdminAuthorsComponent } from './admin-authors/admin-authors.component';
import { AdminNewAuthorComponent } from './admin-new-author/admin-new-author.component';
import { AdminEditAuthorComponent } from './admin-edit-author/admin-edit-author.component';
import { AdminAuthorFormComponent } from './admin-author-form/admin-author-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AdminAuthorsComponent,
    AdminNewAuthorComponent,
    AdminEditAuthorComponent,
    AdminAuthorFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminAuthorRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminAuthorModule { }
