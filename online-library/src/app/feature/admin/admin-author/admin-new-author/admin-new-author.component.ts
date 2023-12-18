import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthorService } from '@feature/public/author/service/author.service';
import { Author } from '@shared/author/Author';
import { AuthorForm } from '@shared/author/AuthorForm';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-new-author',
  templateUrl: './admin-new-author.component.html',
  styleUrls: ['./admin-new-author.component.scss']
})
export class AdminNewAuthorComponent {

  error? : string;
  resetAuthorForm : Subject<Boolean> = new Subject<Boolean>();


  constructor(
    private authorService : AuthorService,
    private toastr: ToastrService
  ){}

  private handleAddAuthorSuccess(res: ApiResponse<Author>): void{
    this.toastr.success(res.message);
    this.resetAuthorForm.next(true);
  }

  private handleAddAuthorError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public addAuthor(authorData : AuthorForm){
    this.authorService.addAuthor(authorData).subscribe({
      next: (res) => this.handleAddAuthorSuccess(res),
      error: (err) => this.handleAddAuthorError(err)
    });
  }

}
