import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BlogService } from 'src/app/modules/public/services/blog/blog.service';
import { GeneralService } from '../../../services/general/general.service';
import { BlogCrudService } from '../../../services/blog-crud/blog-crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-ver',
  templateUrl: './blog-ver.component.html',
  styleUrls: ['./blog-ver.component.sass']
})
export class BlogVerComponent implements OnInit {
  blogs:any = [];
  tags:any;
  dataExists:boolean = false;

  registers:number = 0;
  maxPerPage:number = 10;
  sort:string = "fecha";
  pagination!:number;
  page:number = 1;

  constructor(
    private blogService: BlogService,
    private generalService: GeneralService,
    private blogCrudService: BlogCrudService,
    private router: Router,
    private toastr: ToastrService,
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
    this.blogService.getBlogs(this.maxPerPage, this.page, this.sort).subscribe(
      (data) => {
        this.pagination = data.pagination;
        this.registers = data.registers;
        if(data.data.length == 0){
          this.dataExists = false;
          this.blogs = data.data;
        }else{
          this.dataExists = true;
          let newData = data.data
          newData.map((item:any, index: any) => {
            item.fechaCreatedFormat = moment(new Date(item.dateCreated)).format('YYYY-MM-DD');
            item.horaCreatedFormat = moment(new Date(item.dateCreated)).format('hh:mm A');
            item.fechaEditedFormat = moment(new Date(item.dateEdited)).format('YYYY-MM-DD');
            item.horaEditedFormat = moment(new Date(item.dateEdited)).format('hh:mm A');
            const tag = this.tags.filter((t: { _id: string; }) => t._id == item.tag);
            if (tag.length > 0) {
              item.tag = {color: tag[0].color, description: tag[0].description, title: tag[0].title}
            };
            if(newData.length == index+1){
              this.blogs = newData
            };
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteData(id: any){
    this.blogCrudService.deleteBlog(id).subscribe(
      (data) => {
        this.toastr.error(data.message);
        this.getBlogs();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  pageChange(newPag: number){
    this.page = newPag;
    this.getBlogs();
  }

}
