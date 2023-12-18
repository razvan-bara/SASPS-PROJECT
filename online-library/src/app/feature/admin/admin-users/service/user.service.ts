import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFilter } from '../admin-users/UserFilter';
import { environment } from 'src/environment/environment';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { User } from '@shared/user/User';
import UserForm from '@shared/user/UserForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  public getUser(userId : number){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.USERS}/${userId}`;
    return this.http.get<ApiResponse<User>>(url);
  }

  public getUsers(queryParams : UserFilter){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.USERS}`;
    return this.http.get<ApiResponse<User[]>>(url);
  }

  public getFilteredUsers(queryParams : UserFilter){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.USERS_FIlTERED}?s=${queryParams.s}&page=${queryParams.page}`;
    return this.http.get<ApiResponse<User[]>>(url);
  }

  public addUser(userData : UserForm){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.USERS}`;
    return this.http.post<ApiResponse<User>>(url, userData);
  }

  public updateUser(userData : UserForm, userId : number){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.USERS}/${userId}`;
    return this.http.put<ApiResponse<User>>(url, userData);
  }

  public deleteUser(userId : number){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.USERS}/${userId}`;
  
    return this.http.delete<ApiResponse<User>>(url);
  }
}
