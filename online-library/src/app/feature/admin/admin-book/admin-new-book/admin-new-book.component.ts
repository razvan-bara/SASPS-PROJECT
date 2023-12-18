import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookService } from '@feature/public/book/service/book.service';
import { Book } from '@shared/book/Book';
import { BookForm } from '@shared/book/BookForm';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-admin-new-book',
  templateUrl: './admin-new-book.component.html',
  styleUrls: ['./admin-new-book.component.scss']
})
export class AdminNewBookComponent {

  error? : string;
  resetBookForm : Subject<Boolean> = new Subject<Boolean>();


  constructor(
    private bookService : BookService,
    private toastr: ToastrService
  ){}

  private handleAddBookSuccess(res: ApiResponse<Book>): void{
    this.toastr.success(res.message);
    this.resetBookForm.next(true);
  }

  private handleAddBookError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public addBook(payload : FormData){
    this.bookService.addBook(payload).subscribe({
      next: (res) => this.handleAddBookSuccess(res),
      error: (err) => this.handleAddBookError(err)
    });
  }
}
