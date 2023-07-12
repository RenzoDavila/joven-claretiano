import { BehaviorSubject, observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/observables/user.model';

const user: User = {
  codigo: "",
  nombre: "",
  password: "",
  estado: "",
  ver: false,
  crear: false,
  editar: false,
  eliminar: false
}

// const user: User = {
//   codigo: "rjdavila",
//   nombre: "Renzo Jhair Davila Acosta",
//   password: "123",
//   estado: "super admin",
//   ver: false,
//   crear: false,
//   editar: false,
//   eliminar: false
// }

@Injectable({
  providedIn: 'root'
})

export class ObservableUserServices {
  //definimos el observable como Behavior para emitir el valor y ver los valores emitidos
  private user$ = new BehaviorSubject<User>(user)

  constructor() {};

  //Funcion para devolver la data del Observable
  get selectedUser$(): Observable<User> {
    return this.user$.asObservable();
  }

  //Funcion para cambiar la data del Observable
  setUser(user: User): void {
    this.user$.next(user)
  }
}
