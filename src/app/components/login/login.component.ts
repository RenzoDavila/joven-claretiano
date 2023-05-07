import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/observables/user.model';
import { ObservableUserServices } from 'src/app/services/observable-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  userData!: User;
  userLoggedIn:boolean = false

  constructor(private observableUserServices:ObservableUserServices, public router: Router) {
    this.observableUserServices.selectedUser$.subscribe((observableUser: User) => this.userData = observableUser);
  }

  login(){
    if (this.userData.codigo != '') {
      this.router.navigate(['/dashboard']);
    }else {
      this.userLoggedIn = false;
    }
  }

  cancel(){
    this.router.navigate(['/page']);
  }

}
