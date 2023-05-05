import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent {
  blogs:any;

  constructor(
    private _blogService: BlogService,
    ){ }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this._blogService.getBlogs().subscribe(
      (data) => {
        console.log("data", data)
        this.blogs = data

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
