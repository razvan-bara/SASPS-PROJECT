import { Component, Input } from '@angular/core';
import { Author } from '@shared/author/Author';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent {

  @Input() author! : Author;

  constructor(private authorService: AuthorService){}

  get getAuthorFullName(){
    return `${this.author.first_name} ${this.author.last_name}`
  }
}
