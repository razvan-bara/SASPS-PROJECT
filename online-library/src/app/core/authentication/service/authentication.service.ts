import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginForm from '../components/login/loginForm';
import RegisterForm from '../components/register/registerForm';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(loginForm: LoginForm){
    return this.http.post<ApiResponse>("http://localhost:8080/api/auth/login", loginForm);
  }

  public register(registerForm: RegisterForm){
    return this.http.post<ApiResponse>("http://localhost:8080/api/auth/register", registerForm);
  }

  public confirmEmail(token: string){
    return this.http.get<ApiResponse>("http://localhost:8080/api/auth/confirm_email?token="+token);
  }
}
