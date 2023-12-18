import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '@feature/public/author/service/author.service';
import { Author } from '@shared/author/Author';
import { AuthorForm } from '@shared/author/AuthorForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-author',
  templateUrl: './admin-edit-author.component.html',
  styleUrls: ['./admin-edit-author.component.scss']
})
export class AdminEditAuthorComponent implements OnInit {

  author$! : Author;
  error : string = "";
  private id : number;


  constructor(
    private authorService : AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
    this.id = this.route.snapshot.params['id'];
  }

  private handleAuthorSucess(res : ApiResponse<Author>){
    this.author$ = res.data;
  }

  private handleAuthorError(err : HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata";
    } else {
      this.error = err.error.message;
    }
  }

  private fetchAuthor(authorId : number){
    this.authorService.getAuthor(authorId).subscribe({
      next: res => this.handleAuthorSucess(res),
      error: err => this.handleAuthorError(err)
    })
  }

  ngOnInit(): void {
    this.fetchAuthor(this.id);
  }

  private handleUpdateAuthorSuccess(res: ApiResponse<Author>): void{
    this.toastr.success(res.message);
    this.router.navigate(['/admin/authors']);
  }

  private handleUpdateAuthorError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public updateAuthors(authorData : AuthorForm){
    this.authorService.updateAuthor(authorData, this.id).subscribe({
      next: (res) => this.handleUpdateAuthorSuccess(res),
      error: (err) => this.handleUpdateAuthorError(err)
    });
  }
}
