import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  url = 'api/users/';

  constructor(private http: HttpClient, private router: Router) { }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveUser(user:any): Observable<any> {
    return this.http.post(this.url, user);
  }

  editUser(id: string, jugador: any): Observable<any> {
    return this.http.put(this.url + id, jugador);
  }
}
