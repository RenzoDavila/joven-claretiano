import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { BlogLocal, LastBlogLocal, PopularBlogLocal } from '../../data/constants/BlogLocal.const';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url = environment.server + 'blog/';
  blogLocal:any = BlogLocal;
  lastBlogLocal:any = LastBlogLocal;
  popularBlogLocal:any = PopularBlogLocal;

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

  getBlog(id: string): Observable<any> {
    return of((this.blogLocal).filter((t: { _id: string; }) => t._id == id)[0]);
    // return this.http.get(this.url + id);
  }

  getBlogs(): Observable<any> {
    return of(this.blogLocal);
    // return this.http.get(this.url);
  }

  getLastBlogs(): Observable<any> {
    return of(this.lastBlogLocal);
    // return this.http.get(this.url);
  }

  getPopularBlogs(): Observable<any> {
    return of(this.popularBlogLocal);
    // return this.http.get(this.url);
  }

  deleteJugador(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveJugador(jugador: any): Observable<any> {
    return this.http.post(this.url, jugador);
  }

  editJugador(id: string, jugador: any): Observable<any> {
    return this.http.put(this.url + id, jugador);
  }

}
