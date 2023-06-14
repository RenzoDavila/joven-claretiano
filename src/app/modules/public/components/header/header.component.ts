import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/observables/user.model';
import { ObservableUserServices } from 'src/app/services/observable-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  initialUserData: User =
  {
    codigo: "",
    nombre: "",
    password: "",
    estado: "",
    ver: false,
    crear: false,
    editar: false,
    eliminar: false
  };
  userData!: User;

  constructor(private observableUserServices:ObservableUserServices, public router: Router) {
    this.observableUserServices.selectedUser$.subscribe((observableUser: User) => this.userData = observableUser);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    if (this.userData.codigo == '') {
      this.router.navigate(['/']);
    }
  }

  closeSesion(){
    console.log("includes", this.router.url.includes('/dashboard'))
    this.observableUserServices.setUser(this.initialUserData)
    this.router.navigate(['/']);
  }

  openSesion(){
    const user: User = {
      // codigo: "",
      codigo: "admin",
      nombre: "nombre admin",
      password: "123",
      estado: "super admin",
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    }
    this.observableUserServices.setUser(user)
    this.router.navigate(['/']);
  }

}
