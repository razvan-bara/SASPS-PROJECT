import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminBookFilter } from '@feature/admin/admin-book/admin-books/AdminBookFilter';
import { Book } from '@shared/book/Book';
import { BookFilter } from '../books-list/BookFilter';
import { environment } from 'src/environment/environment';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { BookForm } from '@shared/book/BookForm';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public getBookTitleAndAuthor(book : Book){
    let option : string = book.title;
    if(book.authors != null){
      option =`${book.title} de ${book.authors[0].first_name} ${book.authors[0].last_name}`
    }    
    return option;
  }

  public getBooks(queryParams : BookFilter) {
    const authorId = queryParams.authors > 0 ? queryParams.authors : 0;    
    
    let url : string = `http://localhost:8080/api/v1/books?s=${queryParams.s}&page=${queryParams.page}`;

    if(queryParams.categories.length > 0){

      queryParams.categories.forEach( value => {
        url += `&categories=${value}`
      });
    }

    if(queryParams.authors > 0){
        url += `&authors=${queryParams.authors}`

    }

    return this.http.get<ApiResponse<Book[]>>(url); 
  }

  public getAllBooks(){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.BOOKS}`;
    return this.http.get<ApiResponse<Book[]>>(url);
  }

  public getBook(bookId : number){
    let url : string = `http://localhost:8080/api/v1/books/${bookId}`;
    return this.http.get<ApiResponse<Book>>(url);
  }

  public getBookAuthor(book : Book | null){
    let fullName = "";
    if(book?.authors != null){
      fullName = `${book?.authors[0]?.first_name} ${book?.authors[0]?.last_name}`;
    }
    return fullName;
  }

  public getAdminBooks(queryParams : AdminBookFilter) {
    
    let url : string = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.BOOKS_FILTER}?s=${queryParams.s}&page=${queryParams.page}`;

    if(queryParams.categories.length > 0){

      queryParams.categories.forEach( value => {
        url += `&categories=${value}`
      });

    }

    if(queryParams.authors.length > 0){

      queryParams.authors.forEach( value => {
        url += `&authors=${value}`
      });

    }
    console.log(url);
    
    return this.http.get<ApiResponse<Book[]>>(url); 
  }

  public addBook(payload : FormData){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.BOOKS}`;

    return this.http.post<ApiResponse<Book>>(url, payload);
  }

  public updateBook(payload: FormData, bookId : number){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.BOOKS}/${bookId}`;

    return this.http.put<ApiResponse<Book>>(url, payload);
  }

  public deleteBook(bookId: number){
      const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.BOOKS}/${bookId}`;
  
      return this.http.delete<ApiResponse<Book>>(url);
  }
}
