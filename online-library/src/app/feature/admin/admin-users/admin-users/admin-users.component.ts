import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserFilter } from './UserFilter';
import { UserService } from '../service/user.service'; 
import { faAngleDown, faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from '@shared/user/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  faSearch = faSearch;
  faDropdown = faAngleDown;
  faDelete = faEraser;

  public users$ : User[] = [];
  private nextUsers$ : User[] = [];

  public hideNextPageBtn = false;

  public categoryChoices : Map<number, boolean> = new Map([]);
  public categoryArray : number[] = [];

  public userChoices : Map<number, boolean> = new Map([]);
  public userArray : number[] = [];

  public filterChoices : string[] = [];

  public pageNumber : number = 0;
  public queryParams : UserFilter = {
    "page": this.pageNumber,
    "s": ""
  }

  public nextQueryParams : UserFilter = {
    "page": this.pageNumber+1,
    "s": "",
  }
  
  displayDeleteModal : boolean = false;
  userToDelete! : User;
  error : string = "";

  public USER_KEYS = [
    "#",
    "ID Utilizator",
    "Nume",
    "Adresa mail",
    "Rol",
    "EDIT",
    "DELETE"
  ]

  public constructor(
    private userService: UserService, 
    private toastrService : ToastrService
    ) {}

  public searchUsers(title : string){
    this.queryParams.s = title;
    this.nextQueryParams.s = title;    
  }

  private currentUserPage(res : ApiResponse<User[]>) : void{
    this.users$ = res.data;
    if(this.nextUsers$.length <= 0){
      this.error = "Nu exista utilizatori disponibili";
    }

    if(this.queryParams.s != ""){
      this.error = "Nu am gasit utilizatori cu acest nume"
    }
  }

  private currentUserPageError(err : HttpErrorResponse) : void{
      if(err.status == 0){
        this.error = "Conexiunea la server nu poate fi realizata";
      } else {
        this.error = err.error.message;
      }
  }

  private nextUserPage(res : ApiResponse<User[]>) : void{
    this.nextUsers$ = res.data;
    if(this.nextUsers$.length <= 0){
      this.hideNextPageBtn = true;
    } else {
      this.hideNextPageBtn = false;
    }
  }

  private nextUserPageError(res : HttpErrorResponse) : void{
    console.log(res.error);
  }

  private fetchCurrentUsers(){
    this.userService.getFilteredUsers(this.queryParams).subscribe({
      error: (err) => this.currentUserPageError(err),
      next: (res) => this.currentUserPage(res)
    });
  }

  private fetchNextUsers(){
    this.userService.getFilteredUsers(this.nextQueryParams).subscribe({
      next: (res) => this.nextUserPage(res),
      error: (err) => this.nextUserPageError(err)
    });
  }

  private fetchUsers(){
    this.fetchCurrentUsers()
    this.fetchNextUsers()
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  public filterUsers(){
    this.fetchUsers()
  }

  public changePage(count : number){
    this.queryParams.page += count;
    this.nextQueryParams.page += count;
    this.fetchUsers();
  }

  get isFirstPage(){
    return this.queryParams.page == 0;
  }

  private handleUserDeleteSucess(res : ApiResponse, userId : number){
    this.toastrService.success(res.message);
    this.users$ = this.users$.filter( user => user.user_id != userId); 
  }  
  private handleUserDeleteError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.warning("Nu s-a putut realiza conexiunea la server");
    }else{
      this.toastrService.warning(err.error.message);
    }
  }  

  public deleteUserRow(user : User, confirmDelete : boolean = false){  
    const userId = user.user_id;

    if(user.user_id && !confirmDelete){
      this.userToDelete = user;
      this.displayDeleteModal = true;
    } else {
      this.userService.deleteUser(userId).subscribe({
        next:  res => this.handleUserDeleteSucess(res, userId),
        error: err => this.handleUserDeleteError(err)
      });
    }
  }

  public handleUserDelete(toDelete : boolean){

    if(this.userToDelete == null){
      return;
    }

    if(toDelete){
      this.deleteUserRow(this.userToDelete, toDelete);
      this.displayDeleteModal = false;
    } else {
      this.displayDeleteModal = false;
    }
  }
}
