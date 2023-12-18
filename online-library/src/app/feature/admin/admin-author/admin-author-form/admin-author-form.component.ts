import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '@shared/author/Author';
import { AuthorForm } from '@shared/author/AuthorForm';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-author-form',
  templateUrl: './admin-author-form.component.html',
  styleUrls: ['./admin-author-form.component.scss']
})
export class AdminAuthorFormComponent implements OnInit, OnDestroy {

  @Input() author! : Author;

  private resetForm! : Subscription;
  @Input() decideToResetFormEvent! : Observable<Boolean>;

  authorForm! : FormGroup;
  error : string = "";
  overlay = false;
  isDataLoaded = false;

  @Output() authorFormEvent = new EventEmitter<AuthorForm>();

  constructor(
    private formBuilder: FormBuilder
  ){
    this.authorForm = this.formBuilder.group({
      first_name: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z]*$")]
      ],
      last_name: ['', 
        [Validators.required, Validators.pattern("^[A-Za-z]( ?[A-Za-z] ?)*$")]
      ]
      });
  }

  get firstName(){
    return this.authorForm.get("first_name");
  }

  get lastName(){
    return this.authorForm.get("last_name");
  }



  get isFirstNameTouched(){
    return this.firstName?.invalid && (this.firstName?.dirty || this.firstName?.touched);
  }

  get isFirstNameEmpty(){
    return this.firstName?.errors?.['required'];
  }

  get isFirstNameValid(){
    return this.firstName?.valid;
  }

  get isFirstNameInvalid(){
    return this.isFirstNameTouched && !this.isFirstNameValid;
  }



  get isLastNameTouched(){
    return this.lastName?.invalid && (this.lastName?.dirty || this.lastName?.touched);
  }

  get isLastNameEmpty(){
    return this.lastName?.errors?.['required'];
  }

  get isLastNameValid(){
    return this.lastName?.valid;
  }

  get isLastNameInvalid(){
    return this.isLastNameTouched && !this.isLastNameValid;
  }


  private setAuthorIfExists(){
    if(this.author != null){
      this.authorForm.patchValue({
        first_name : this.author.first_name,
        last_name : this.author.last_name,
      });
    }
  }

  private subscribeToResetForm(){    
    if(this.decideToResetFormEvent != null){            
      this.resetForm = this.decideToResetFormEvent.subscribe({
        next: next => this.authorForm.reset(),
      });
    }
  }

  ngOnInit(): void {
    this.setAuthorIfExists();
    this.isDataLoaded=true;
    this.subscribeToResetForm();
  }

  onSubmit(): void {
    const AuthorData : AuthorForm = this.authorForm.value;
    this.authorFormEvent.emit(AuthorData);
  }

  ngOnDestroy() {
    if(this.decideToResetFormEvent != null){
      this.resetForm.unsubscribe();
    }
  }

}
