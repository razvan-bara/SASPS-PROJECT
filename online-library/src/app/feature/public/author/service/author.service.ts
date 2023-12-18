import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@shared/author/Author';
import { AuthorForm } from '@shared/author/AuthorForm';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { environment } from 'src/environment/environment';
import { AuthorFilter } from '../authors/AuthorFilter';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  public getAuthors(queryParams : AuthorFilter){
    let url = `${environment.baseUrl+ApiPrefix.PUBLIC+ApiPaths.AUTHORS}?s=${queryParams.s}&page=${queryParams.page}`;
    return this.http.get<ApiResponse<Author[]>>(url);
  }

  public getAuthor(authorId : number){
    let url = `${environment.baseUrl+ApiPrefix.PUBLIC+ApiPaths.AUTHORS}/${authorId}`;
    return this.http.get<ApiResponse<Author>>(url);
  }

  public getAllAuthors(){
    let url = `${environment.baseUrl+ApiPrefix.PUBLIC+ApiPaths.All_AUTHORS}`;
    return this.http.get<ApiResponse<Author[]>>(url);
  }

  public getAdminAuthors(queryParams : AuthorFilter){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.AUTHORS_FIlTERED}?s=${queryParams.s}&page=${queryParams.page}`;
    if(queryParams.withBooks != null){
      url += `&withBooks=${queryParams.withBooks}`;
    }
    return this.http.get<ApiResponse<Author[]>>(url);
  }

  public addAuthor(authorData : AuthorForm){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.AUTHORS}`;
    return this.http.post<ApiResponse<Author>>(url, authorData);
  }

  public updateAuthor(authorData : AuthorForm, authorId : number){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.AUTHORS}/${authorId}`;
    return this.http.put<ApiResponse<Author>>(url, authorData);
  }

  public deleteAuthor(authorId : number){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.AUTHORS}/${authorId}`;
  
    return this.http.delete<ApiResponse<Author>>(url);
  }
}
