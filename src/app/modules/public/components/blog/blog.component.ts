import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import * as moment from 'moment';
import { GeneralService } from 'src/app/modules/private/services/general/general.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent {
  blogs:any;
  tags:any;
  urlServer = environment.server;

  registers:number = 0;
  maxPerPage:number = 10;
  sort:string = "fecha";
  pagination!:number;
  page:number = 1;

  dataExists:boolean = false;

  constructor(
    private blogService: BlogService,
    private generalService: GeneralService,
    public router: Router
    ){ }

  ngOnInit(): void {
    moment.locale('es')
    this.getTags();
  }

  getTags(){
    this.generalService.getTags().subscribe(
      (data) => {
        console.log("tag", data)
        this.tags = data
        this.getBlogs();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  getBlogs() {
    this.blogService.getBlogs(this.maxPerPage, this.page, this.sort).subscribe(
      (data) => {
        this.pagination = data.pagination;
        this.registers = data.registers;

        if(data.data.length == 0){
          this.dataExists = false;
          this.blogs = data.data;
        }
        else{
          console.log("data", data)
          let newData = data.data
          newData.map((item:any, index: any) => {
            item.fechaFormat = moment(new Date(item.dateCreated)).format('YYYY-MM-DD hh:mm A');

            const tag = this.tags.filter((t: { _id: string; }) => t._id == item.tag);

            if (tag.length > 0) {
              item.tag = {color: tag[0].color, description: tag[0].description, title: tag[0].title}
            };

            if(newData.length == index+1){
              this.blogs = newData;
            };

          });
        }
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

  redirect(ruta: any){
    this.router.navigate([`/blog-post/${ruta}`]);
  }

  changeTag(){

  }

  changeSort(){

  }

}
