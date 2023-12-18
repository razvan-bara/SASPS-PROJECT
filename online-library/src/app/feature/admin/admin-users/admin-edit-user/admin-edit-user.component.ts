import { Component } from '@angular/core';
import { User } from '@shared/user/User';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import UserForm from '@shared/user/UserForm';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent {
  user$! : User;
  error : string = "";
  private id : number;


  constructor(
    private userService : UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
    this.id = this.route.snapshot.params['id'];
  }

  private handleUserSucess(res : ApiResponse<User>){
    this.user$ = res.data;
  }

  private handleUserError(err : HttpErrorResponse){
    if(err.status == 0){
      this.error = "Conexiunea la server nu poate fi realizata";
    } else {
      this.error = err.error.message;
    }
  }

  private fetchUser(userId : number){
    this.userService.getUser(userId).subscribe({
      next: res => this.handleUserSucess(res),
      error: err => this.handleUserError(err)
    })
  }

  ngOnInit(): void {
    this.fetchUser(this.id);
  }

  private handleUpdateUserSuccess(res: ApiResponse<User>): void{
    this.toastr.success(res.message);
    this.router.navigate(['/admin/users']);
  }

  private handleUpdateUserError(err : HttpErrorResponse): void{
    if(err.status ==0){
      this.error = "Nu s-a putut conecta la server"
    }else{
      this.error = err.error.message;
    }
    this.toastr.warning(this.error);
  }

  public updateUser(userData : UserForm){
    this.userService.updateUser(userData, this.id).subscribe({
      next: (res) => this.handleUpdateUserSuccess(res),
      error: (err) => this.handleUpdateUserError(err)
    });
  }
}
