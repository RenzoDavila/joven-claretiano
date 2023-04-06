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

}
