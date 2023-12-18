import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/authentication/service/authentication.service';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss']
})
export class ConfirmMailComponent implements OnInit {
  title: string = "";
  message: string = "";
  isError: boolean = false;
  isWarning: boolean = false;
  fetchedInfo: boolean = false;

  constructor(
    private authenticationService: AuthenticationService, 
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.confirmEmail();
  }

  private handleSuceess(res: ApiResponse){
    this.title = res.message;
    this.message = "Emailul a fost confirmat, puteti intra in cont";
    if(res.status == 202){
      this.message = "A trecut prea mult timp de cand ati primit mailul. V-am retrimis un nou mail de confirmare";
    }
  }

  private handleError(err: HttpErrorResponse){
    if(err.status ==0){
      this.title = "Mail neconfirmat"
      this.message = "Nu s-a putut conecta la server"
      this.isError = true;
    }else{
      this.message = err.error.message;
      switch(err.status){
        case 404: this.title = "Mail neconfirmat"
                  this.isError = true;
                  break;
        case 400: this.title = "Mail confirmat"
                  this.isWarning = true;
                  break;
      }
    }
  }

  private confirmEmail(){
    const token : string = this.route.snapshot.params['token'];
    this.authenticationService.confirmEmail(token).subscribe({
      error: (err) => this.handleError(err),
      next: (res) => this.handleSuceess(res),
    });
    this.fetchedInfo = true;
  }
}
