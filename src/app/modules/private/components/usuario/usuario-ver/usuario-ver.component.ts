import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/public/services/user/user.service';
import { GeneralService } from '../../../services/general/general.service';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-ver',
  templateUrl: './usuario-ver.component.html',
  styleUrls: ['./usuario-ver.component.sass']
})
export class UsuarioVerComponent {
  users:any;
  tags:any;

  constructor(
    private _userService: UserService,
    private generalService: GeneralService,
    ){
  }

  ngOnInit(): void {
    moment.locale('es')
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
