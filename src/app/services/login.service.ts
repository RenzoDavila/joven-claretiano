import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.server + 'api/login/';

  constructor(private http: HttpClient) { }

  login(form:any): Observable<any> {
    return this.http.post(this.url, form);
  }
}
