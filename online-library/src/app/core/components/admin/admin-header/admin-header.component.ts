import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/service/authentication.service';
import { StorageService } from '@core/storage/storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  isMobile : boolean = false;

  constructor(
    @Inject(StorageService) private storageService: StorageService,
    private router: Router
  ){}

  ngOnInit() {}

  navItems: Array<String> = new Array<String>(
    'Carti',
    'Autori',
    'Cateogrii',
    'Comenzi',
    'Utilizatori'
  );

  routes: Array<String> = new Array<String>(
    '/admin/books',
    '/admin/authors',
    '/admin/categories',
    '/admin/orders',
    '/admin/users',
  );
  
  public toggleMobileMenu() : void {
    this.isMobile = !this.isMobile;
  }

  public logout(){
    this.storageService.logOut();
    this.router.navigate(['/'])
  }
}
