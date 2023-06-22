import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagCrudService {
  url = 'api/tags/';

  constructor(private http: HttpClient, private router: Router) { }

  deleteTag(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveTag(tag:any): Observable<any> {
    return this.http.post(this.url, tag);
  }

  editTag(id: string, jugador: any): Observable<any> {
    return this.http.put(this.url + id, jugador);
  }
}
