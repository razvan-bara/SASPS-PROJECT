import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@shared/user/User';
import UserForm from '@shared/user/UserForm';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.scss']
})
export class AdminUserFormComponent {
  @Input() user! : User;

  userForm! : FormGroup;
  error : string = "";
  overlay = false;
  isDataLoaded = false;

  @Output() userFormEvent = new EventEmitter<UserForm>();

  constructor(
    private formBuilder: FormBuilder
  ){
    this.userForm = this.formBuilder.group({
      first_name: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z]*$")]
      ],
      last_name: ['', 
        [Validators.required, Validators.pattern("^[a-zA-Z]*$")]
      ],
      email: ['', 
      [Validators.required, Validators.email]
      ],
      role: ['0', 
        [Validators.required]
      ],
      });
  }

  get firstName(){
    return this.userForm.get("first_name");
  }

  get lastName(){
    return this.userForm.get("last_name");
  }

  get email(){
    return this.userForm.get("email");
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



  get isEmailTouched(){
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get isEmailEmpty(){
    return this.email?.errors?.['required'];
  }

  get isEmailValid(){
    return this.email?.valid;
  }

  get isEmailInvalid(){
    return this.isEmailTouched && !this.isEmailValid;
  }


  private setUserIfExists(){
    if(this.user != null){
      this.userForm.patchValue({
        first_name : this.user.first_name,
        last_name : this.user.last_name,
        email : this.user.email,
        role : this.user.role[0] == 'client' ? 0 : 1
      });
    }
  }

  ngOnInit(): void {
    this.setUserIfExists();
    this.isDataLoaded=true;
  }

  onSubmit(): void {
    let UserData : UserForm = this.userForm.value;
    UserData.role = UserData.role == "1" ? "admin" : "client";
    this.userFormEvent.emit(UserData);
  }
}
