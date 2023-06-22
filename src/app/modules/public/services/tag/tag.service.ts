import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url = 'api/tags/';

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

  getTag(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  getTags(number: number, page: number, sort: string): Observable<any> {
    return this.http.get(this.url + number  + '/' + page  + '/' + sort);
  }
}
