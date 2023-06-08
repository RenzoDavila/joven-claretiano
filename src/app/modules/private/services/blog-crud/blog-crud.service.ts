import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BlogLocal, LastBlogLocal, PopularBlogLocal } from '../../data/constants/BlogLocal.const';
import { IBlogRequest } from '../../data/requests/blog-request';

@Injectable({
  providedIn: 'root'
})
export class BlogCrudService {
  url = 'api/blogs/';
  blogLocal:any = BlogLocal;
  lastBlogLocal:any = LastBlogLocal;
  popularBlogLocal:any = PopularBlogLocal;

  constructor(private http: HttpClient, private router: Router) { }

  deleteJugador(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveJugador(fd:any): Observable<any> {
    return this.http.post(this.url, fd);
  }

  editJugador(id: string, jugador: any): Observable<any> {
    return this.http.put(this.url + id, jugador);
  }
}
