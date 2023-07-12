import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/observables/user.model';
import { GeneralService } from 'src/app/modules/private/services/general/general.service';
import { LoginService } from 'src/app/services/login.service';
import { ObservableUserServices } from 'src/app/services/observable-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  userData!: User;
  userLoggedIn:boolean = false;
  form: FormGroup;

  constructor(private observableUserServices:ObservableUserServices, public router: Router, private loginService: LoginService, private fb: FormBuilder, private toastr: ToastrService,) {
    this.form = this.fb.group({
      userLogin: ['', Validators.required],
      passLogin: ['', Validators.required],
    });
    this.observableUserServices.selectedUser$.subscribe((observableUser: User) => this.userData = observableUser);
  }

  login(){

    this.loginService.login(this.form.value).subscribe(
      (data) => {
        console.log("data", data)

        if(data.message){
          this.toastr.error(data.message, 'Error');
        }
        else{
          const user: User = {
            // codigo: "",
            codigo: data.codigo,
            nombre: data.nombres,
            password: data.password,
            estado: data.estado,
            ver: data.ver,
            crear: data.crear,
            editar: data.editar,
            eliminar: data.eliminar,
          };
          this.observableUserServices.setUser(user);
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    // if (this.userData.codigo != '') {
    //   this.router.navigate(['/dashboard']);
    // }else {
    //   this.userLoggedIn = false;
    // }
  }

  cancel(){
    this.router.navigate(['/page']);
  }

}
