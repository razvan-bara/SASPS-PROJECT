import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModal } from './auth-modal/auth-modal.component';
import { RatingComponent } from './rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthorModalComponent } from './author/author-modal/author-modal.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';

@NgModule({
  declarations: [
    AuthModal,
    RatingComponent,
    AuthorModalComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AuthModal,
    RatingComponent,
    AuthorModalComponent,
    UserModalComponent
  ]
})
export class SharedModule { }
