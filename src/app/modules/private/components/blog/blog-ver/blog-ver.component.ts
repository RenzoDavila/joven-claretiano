import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BlogService } from 'src/app/modules/public/services/blog/blog.service';
import { GeneralService } from '../../../services/general/general.service';
import { BlogCrudService } from '../../../services/blog-crud/blog-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-ver',
  templateUrl: './blog-ver.component.html',
  styleUrls: ['./blog-ver.component.sass']
})
export class BlogVerComponent implements OnInit {
  blogs:any;
  tags:any;

  constructor(
    private _blogService: BlogService,
    private generalService: GeneralService,
    private blogCrudService: BlogCrudService,
    private router: Router,
    ){
  }

  ngOnInit(): void {
    moment.locale('es')
    this.getTags();
  }

  getTags(){
    this.generalService.getTags().subscribe(
      (data) => {
        this.tags = data
        this.getBlogs();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  getBlogs(){
    this._blogService.getBlogs().subscribe(
      (data) => {
        let newData = data
        newData.map((item:any, index: any) => {
          item.fechaFormat = moment(new Date(item.fecha)).format('YYYY-MM-DD');
          item.horaFormat = moment(new Date(item.fecha)).format('hh:mm A');
          const tag = this.tags.filter((t: { _id: string; }) => t._id == item.tag);
          if (tag.length > 0) {
            item.tag = {color: tag[0].color, description: tag[0].description, title: tag[0].title}
          };
          if(newData.length == index+1){
            this.blogs = newData
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteData(id: any){
    this.blogCrudService.deleteBlog(id).subscribe(
      (data) => {
        this.router.navigateByUrl('/dashboard/blogs');
        console.log(data);
      },

      (error) => {
        console.log(error);
      }
    );
  }

}
