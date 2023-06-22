import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/public/services/user/user.service';
import { GeneralService } from '../../../services/general/general.service';
import * as moment from 'moment';
import { UserCrudService } from '../../../services/user-crud/user-crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-ver',
  templateUrl: './usuario-ver.component.html',
  styleUrls: ['./usuario-ver.component.sass']
})
export class UsuarioVerComponent {
  users:any;
  tags:any;
  dataExists:boolean = false;

  registers:number = 0;
  maxPerPage:number = 10;
  sort:string = "fecha";
  pagination!:number;
  page:number = 1;

  constructor(
    private _userService: UserService,
    private generalService: GeneralService,
    private userCrudService: UserCrudService,
    private router: Router,
    private toastr: ToastrService,
    ){
  }

  ngOnInit(): void {
    moment.locale('es')
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers(this.maxPerPage, this.page, this.sort).subscribe(
      (data) => {
        console.log("data dasd", data);
        this.pagination = data.pagination;
        this.registers = data.registers;
        if(data.data.length == 0){
          this.dataExists = false;
          this.users = data.data;
        }else{
          this.dataExists = true;
          this.users = data.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteData(id: any){
    this.userCrudService.deleteUser(id).subscribe(
      (data) => {
        this.toastr.error(data.message);
        this.getUsers();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  pageChange(newPag: number){
    this.page = newPag;
    this.getUsers();
  }

}
