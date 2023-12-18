import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  public getSomething(){
    return this.http.get<ApiResponse>("http://localhost:8080/api/books");
  }
}
