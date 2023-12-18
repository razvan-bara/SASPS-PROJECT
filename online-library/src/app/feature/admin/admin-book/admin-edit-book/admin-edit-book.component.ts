import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@feature/public/book/service/book.service';
import { Book } from '@shared/book/Book';
import { BookForm } from '@shared/book/BookForm';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-edit-book',
  templateUrl: './admin-edit-book.component.html',
  styleUrls: ['./admin-edit-book.component.scss']
})
export class AdminEditBookComponent implements OnInit{

  book$! : Book;
  error : string = "";
  private id : number;


  constructor(
    private bookService : BookService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
    this.id = this.route.snapshot.params['id'];
  }

  private handleBookSucess(res : ApiResponse<Book>){
    this.book$ = res.data;
  }

  private handleBookError(err : HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata";
    } else {
      this.error = err.error.message;
    }
  }

  private fetchBook(bookId : number){
    this.bookService.getBook(bookId).subscribe({
      next: res => this.handleBookSucess(res),
      error: err => this.handleBookError(err)
    })
  }

  ngOnInit(): void {
    this.fetchBook(this.id);
  }

  private handleUpdateBookSuccess(res: ApiResponse<Book>): void{
    this.toastr.success(res.message);
    this.router.navigate(['/admin/books']);
  }

  private handleUpdateBookError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public updateBook(payload : FormData){
    this.bookService.updateBook(payload, this.id).subscribe({
      next: (res) => this.handleUpdateBookSuccess(res),
      error: (err) => this.handleUpdateBookError(err)
    });
  }
}
