import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '@shared/book/Book';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor(private http : HttpClient) { }

  public rateBook(book : Book, rating : number){
    const url : string = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.RATE_BOOK}`;
    const bookRatingData = {
      bookId: book.bookId,
      rating: rating
    }
    return this.http.post<ApiResponse>(url, bookRatingData);
  }
}
