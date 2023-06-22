import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/modules/private/services/general/general.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.sass']
})
export class BlogPostComponent implements OnInit {
  id: any ;
  blog: any;
  tags:any;
  lastBlog:any;
  popularBlogs:any;
  urlServer = environment.server;

  constructor(private aRoute: ActivatedRoute, private blogService: BlogService, private generalService: GeneralService){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    moment.locale('es');
    this.getTags();
  }

  getTags(){
    this.generalService.getTags().subscribe(
      (data) => {
        this.tags = data;
        this.getBlogAddView(this.id);
        this.getLastBlogs();
        this.getPopularBlogs();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  getBlogAddView(id: string){
    this.blogService.getBlogAddView(id).subscribe(
      (data) => {
        console.log("getBlogAddView", data)
        this.blog = data
        this.blog.fechaFormat = moment(new Date(this.blog.fecha)).format('MMM Do [Del] YYYY [a las] hh:mm:ss');
        const tag = this.tags.filter((t: { _id: string; }) => t._id == this.blog.tag);
        this.blog.tag = tag;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLastBlogs() {
    this.blogService.getLastBlogs(3).subscribe(
      (data) => {
        console.log("getLastBlogs", data)
        let newData = data;
        newData.map((item:any, index: any) => {
          item.fechaFormat = moment(new Date(item.fecha)).format('YYYY-MM-DD hh:mm A');

          const tag = this.tags.filter((t: { _id: string; }) => t._id == item.tag);

          if (tag.length > 0) {
            item.tag = {color: tag[0].color, description: tag[0].description, title: tag[0].title};
          };

          if(newData.length == index + 1){
            this.lastBlog = newData;
          };

        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getPopularBlogs() {
    this.blogService.getPopularBlogs(3).subscribe(
      (data) => {
        console.log("getPopularBlogs", data)
        let newData = data;
        newData.map((item:any, index: any) => {
          item.fechaFormat = moment(new Date(item.fecha)).format('YYYY-MM-DD hh:mm A');

          const tag = this.tags.filter((t: { _id: string; }) => t._id == item.tag);

          if (tag.length > 0) {
            item.tag = {color: tag[0].color, description: tag[0].description, title: tag[0].title};
          };

          if(newData.length == index + 1){
            this.popularBlogs = newData;
          };

        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

}
