import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import * as moment from 'moment';

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
        this.blogs = data

        this.blogs!.map((item: any) => {
          console.log("item.fecha", item.fecha)
          item.fechaFormat = moment(new Date(item.fecha)).format('YYYY-MM-DD hh:mm:ss');
        })
        console.log("this.blogs", this.blogs)

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
