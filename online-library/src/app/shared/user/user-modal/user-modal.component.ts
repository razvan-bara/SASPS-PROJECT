import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { User } from '../User';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  @Input() showModal! : boolean; 
  @Input() userInput!: User;
  @Output() deleteUser = new EventEmitter<boolean>();
  faDanger = faExclamationTriangle;

  public emitToDelete(toDelete : boolean){
    this.deleteUser.emit(toDelete);
  }

}
