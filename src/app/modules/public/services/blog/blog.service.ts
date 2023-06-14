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
  url = 'api/blogs/';
  urlAdd = 'api/blogsAddView/';
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
    return this.http.get(this.url + id);
  }

  getBlogs(): Observable<any> {
    return this.http.get(this.url);
  }

  getBlogAddView(id: string): Observable<any> {
    return this.http.get(this.urlAdd + id);
  }

  getLastBlogs(number: Number): Observable<any> {
    return this.http.get(this.url + 'last/' + number);
  }

  getPopularBlogs(number: Number): Observable<any> {
    return this.http.get(this.url + 'popular/' + number);
  }
}
