import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  urlTag = environment.server + 'tags';

  constructor(private http: HttpClient, private router: Router) { }

  getTags(): Observable<any> {
    return this.http.get("/api/tags");
  }

  postTag(): Observable<any> {
    const rq = {
      description: "Prueba1",
      color: "red"
    }
    return this.http.post(this.urlTag, rq);
  }
}
