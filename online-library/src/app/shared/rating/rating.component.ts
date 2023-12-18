import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Book } from '@shared/book/Book';
import { ToastrService } from 'ngx-toastr';
import { BookRatingService } from './book-rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  faStar = faStar;
  stars : number[] = [];
  rating : number = 1;
  @Input() book! : Book | null;
  @Input() modalInput! : boolean; 
  @Output() hideRatingModal = new EventEmitter();

  constructor(private bookRatingService : BookRatingService, private toastr : ToastrService){
    for (let i = 1; i <= 5; i++) {
        this.stars.push(i);
    }    
  }

  private resetStars(starsDiv : NodeListOf<Element>){
    starsDiv.forEach(starEl => {
      if(starEl.classList.contains("active")){
        starEl.classList.remove("active");
      }
    })
  }

  public hideModal(){
    this.hideRatingModal.emit();
  }

  
  public handleBookRatingSuccess(res : ApiResponse){
    this.toastr.success("Rating adaugat cu succes");
  }

 
  public handleBookRatingError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastr.error("Conexiunea la server nu poate fi realizata")
    }else {
      this.toastr.error("Intra in cont inainte de a lasa un review")
    }
  }

  public submitRating(){
    const starsDiv: NodeListOf<Element> = document.querySelectorAll(".star");
    this.resetStars(starsDiv);
    this.bookRatingService.rateBook(this.book!, this.rating).subscribe({
      next: res => this.handleBookRatingSuccess(res),
      error: err => this.handleBookRatingError(err)
    })
    this.hideModal();
  }

  public setStarsActive(index : number){
    const starsDiv: NodeListOf<Element> = document.querySelectorAll(".star");
    this.resetStars(starsDiv);
    for(let i = 0; i < index; i++){
      starsDiv[i].classList.add("active");
    }
    this.rating=index;

    
  }
}
