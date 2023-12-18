import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  isAdminHompage :boolean = false

  constructor(
    private route : Router
  ){
    route.events.subscribe(val => {
      if(val instanceof NavigationEnd){
        const url : string = val.url;
        if(url == "/admin"){
          this.isAdminHompage = true;
        } else {
          this.isAdminHompage = false;
        }
      }
      
    });
  }

}
