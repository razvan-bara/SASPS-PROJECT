import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Author } from '../Author';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.scss']
})
export class AuthorModalComponent {
  @Input() showModal! : boolean; 
  @Input() authorInput!: Author;
  @Output() deleteAuthor = new EventEmitter<boolean>();
  faDanger = faExclamationTriangle;

  public emitToDelete(toDelete : boolean){
    this.deleteAuthor.emit(toDelete);
  }

}
