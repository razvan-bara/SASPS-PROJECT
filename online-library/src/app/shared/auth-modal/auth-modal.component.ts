import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModal {
  @Input() modalInput! : boolean; 
  @Output() closeModal = new EventEmitter();

  constructor(private router: Router){

  }

  public hideModal(route? : string){
    this.closeModal.emit(route);
    if(route != null){
      this.router.navigate([route]);
    }
  }
}
