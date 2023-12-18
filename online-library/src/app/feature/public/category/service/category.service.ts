import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@shared/category/Category';
import { CategoryForm } from '@shared/category/CategoryForm';
import { ApiPrefix, ApiPaths } from 'src/environment/api-paths';
import { environment } from 'src/environment/environment';
import { CategoryFilter } from '../categories/CategoryFilter';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories() {
    return this.http.get<ApiResponse<Category[]>>("http://localhost:8080/api/v1/categories");
  }

  public getCategoriesSortedAndPageable(queryParams : CategoryFilter){
    const url = `${environment.baseUrl+ApiPrefix.PUBLIC+ApiPaths.CATEGORIES}?page=${queryParams.page}&s=${queryParams.s}`;
    return this.http.get<ApiResponse<Category[]>>(url);
  }

  public getCategory(categoryId : number){
    const url = `${environment.baseUrl+ApiPrefix.PUBLIC+ApiPaths.CATEGORIES}/${categoryId}`;
    return this.http.get<ApiResponse<Category>>(url);
  }
  public getAdminCategories(queryParams : CategoryFilter){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.CATEGORIES_FIlTERED}?s=${queryParams.s}&page=${queryParams.page}`;
    return this.http.get<ApiResponse<Category[]>>(url);
  }

  public addCategory(categoryData : CategoryForm){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.CATEGORIES}`;
    return this.http.post<ApiResponse<Category>>(url, categoryData);
  }

  public updateCategory(categoryData : CategoryForm, categoryId : number){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.CATEGORIES}/${categoryId}`;
    return this.http.put<ApiResponse<Category>>(url, categoryData);
  }

  public deleteCategory(categoryId : number){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.CATEGORIES}/${categoryId}`;
  
    return this.http.delete<ApiResponse<Category>>(url);
  }
}
