import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/service/authentication.service';
import { faEnvelope, faExclamationTriangle, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import RegisterForm from './registerForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  faEnvelope = faEnvelope;
  faExclamation = faExclamationTriangle;
  faLock = faLock;
  faUser = faUser;
  registerForm : FormGroup;
  error : string = "";

  constructor(
    private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService, 
    private toastr: ToastrService,
    private router: Router
    ) {
    this.registerForm = this.formBuilder.group({
      email: ['', 
      [Validators.required,Validators.email]
      ],
      first_name: ['', 
      [Validators.required,Validators.pattern('^[a-z-A-Z]+$')]
      ],
      last_name: ['', 
      [Validators.required,Validators.pattern('^[a-zA-Z]+$')]
      ],
      password: ['', 
      [Validators.required, Validators.minLength(6)]
      ],
      confirm_password: ['', 
      [Validators.required]
      ],
      });
    }

    get email(){
      return this.registerForm.get('email');
    }

    get password(){
      return this.registerForm.get('password');
    }

    get confirmPassword(){
      return this.registerForm.get('confirm_password');
    }

    get firstName(){
      return this.registerForm.get('first_name');
    }

    get lastName(){
      return this.registerForm.get('last_name');
    }




    get isEmailTouched(){
      return this.email?.invalid && (this.email?.dirty || this.email?.touched);
    }
  
    get isEmailEmpty(){
      return this.email?.errors?.['required'];
    }
  
    get isEmailFormat(){
      return this.email?.errors?.['email'];
    }
  
    get isEmailValid(){
      return this.email?.valid;
    }
  
    get isEmailInvalid(){
      return this.isEmailTouched && !this.isEmailValid;
    }



    get isFirstNameTouched(){
      return this.firstName?.invalid && (this.firstName?.dirty || this.firstName?.touched);
    }
  
    get isFirstNameEmpty(){
      return this.firstName?.errors?.['required'];
    }
  
    get isFirstNameFormat(){
      return this.firstName?.errors?.['pattern'];
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
  
    get isLastNameFormat(){
      return this.lastName?.errors?.['pattern'];
    }
  
    get isLastNameValid(){
      return this.lastName?.valid;
    }
  
    get isLastNameInvalid(){
      return this.isLastNameTouched && !this.isLastNameValid;
    }



    get isPasswordTouched(){
      return this.password?.invalid && (this.password?.dirty || this.password?.touched);
    }
  
    get isPasswordValid(){
      return this.password?.valid;
    }
  
    get isPasswordInvalid(){
      return this.isPasswordTouched && !this.isPasswordValid;
    }

    get isPasswordEmpty(){
      return this.password?.errors?.['required'];
    }

    get isPasswordLongEnough(){
      return !this.password?.errors?.['minLength'];
    }


    get isConfirmPasswordMatched(){
      return (this.confirmPassword?.value === this.password?.value);
    }

    get isConfirmPasswordValid(){
      return this.confirmPassword?.valid && this.isConfirmPasswordMatched;
    }

    get isConfirmPasswordTouched(){
      return !this.isConfirmPasswordValid && (this.confirmPassword?.dirty || this.confirmPassword?.touched);
    }

    private handleSuccess(res: ApiResponse): void{
      this.toastr.success(res.message);
      this.error = "";
      this.registerForm.reset();
      this.router.navigate(['/mail']);
  
    }
  
    private handleError(err : HttpErrorResponse): void{
      if(err.status ==0){
        this.error = "Nu s-a putut conecta la server"
      }else{
        this.error = err.error.message;
      }
    }

    onSubmit(): void {
      const registerData: RegisterForm = this.registerForm.value;
      this.authenticationService.register(this.registerForm.value).subscribe({
        error: (err) => this.handleError(err),
        next: (res) => this.handleSuccess(res)
      });      
    }
}
