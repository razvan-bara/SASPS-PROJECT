import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '@shared/author/Author';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-single-author',
  templateUrl: './single-author.component.html',
  styleUrls: ['./single-author.component.scss']
})
export class SingleAuthorComponent implements OnInit{

  public author$! : Author;
  public id : number;
  public error! : string;
  public title! : string;
  public subtitle! : string;

  constructor(
    private authorService : AuthorService,
    private route: ActivatedRoute
    ){
      this.id = this.route.snapshot.params['id'];
    }

    private handleAuthorSuccess(res : ApiResponse<Author>){
      this.author$ = res.data;
      const fullname = `${this.author$.first_name} ${this.author$.last_name}`;
      this.title = fullname;
      this.subtitle = `Cartile scrise de ${fullname}`;
    }

    private handleAuthorError(err : HttpErrorResponse){
      
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
    }

  private getAuthor(authorId : number){
    this.authorService.getAuthor(authorId).subscribe({
      next: res => this.handleAuthorSuccess(res),
      error: err => this.handleAuthorError(err)
    })
  }

  ngOnInit(): void {
    this.getAuthor(this.id);
  }

}
