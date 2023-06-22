import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.server + 'api/users/';

  constructor(private http: HttpClient, private router: Router) { }
  private data:any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  getUsers(number: number, page: number, sort: string): Observable<any> {
    return this.http.get(this.url + number  + '/' + page  + '/' + sort);
  }
}
