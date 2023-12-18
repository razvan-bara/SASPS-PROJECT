import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '@core/storage/storage.service';
import { AuthenticationService } from '@core/authentication/service/authentication.service';
import { faEnvelope, faExclamationTriangle, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import LoginForm from './loginForm';
import { AuthorizationService } from '@core/authentication/service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  faEnvelope = faEnvelope;
  faExclamation = faExclamationTriangle;
  faLock = faLock;
  loginForm : FormGroup;
  error : string = "";

  constructor(
    private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService, 
    private toastr: ToastrService,
    private storageService: StorageService,
    private authorizationService : AuthorizationService,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', 
      [Validators.required,Validators.email]
      ],
      password: ['', 
      [Validators.required]
      ]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
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



  get isPasswordTouched(){
    return this.password?.invalid && (this.password?.dirty || this.password?.touched)
  }

  get isPasswordValid(){
    return this.password?.valid;
  }

  get isPasswordInvalid(){
    return this.isPasswordTouched && !this.isPasswordValid;
  }


  private handleSuccess(res: ApiResponse): void{
    this.toastr.success(res.message);
    this.error = "";
    this.storageService.saveTokens(res);
    this.loginForm.reset();

    let redirectTo : string = "/";
    if(this.authorizationService.isAdmin()){
      redirectTo += "admin";
    }
    this.router.navigate([redirectTo]);

  }

  private handleError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
  }

  onSubmit(): void {
    const loginData : LoginForm = this.loginForm.value;
    this.authenticationService.login(loginData).subscribe({
      error: (err) => this.handleError(err),
      next: (res) => this.handleSuccess(res)
    });
  }

}
