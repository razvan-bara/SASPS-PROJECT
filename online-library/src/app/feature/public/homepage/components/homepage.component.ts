import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { HomepageService } from '../service/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  public books : any;
  faArrow = faArrowAltCircleRight

  public constructor(private homepageService: HomepageService){}

  // ngOnInit(): void {
  //   console.log("ceva");
  //   this.books = this.getBooks().subscribe();
  // }

  // public getBooks(){
  //   return this.homepageService.getSomething();
  // }
}
