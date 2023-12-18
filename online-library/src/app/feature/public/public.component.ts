import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit{

  isHomepage :boolean = false;

  constructor(
    private route : Router
  ){
    route.events.subscribe(val => {
      if(val instanceof NavigationEnd){
        const url : string = val.url;
        if(url == "/"){
          this.isHomepage = true;
        } else {
          this.isHomepage = false;
        }
      }
      
    });
  }

  ngOnInit(): void {
    
  }

}
