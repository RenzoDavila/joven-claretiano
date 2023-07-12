import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services/services.service';
import * as moment from 'moment';
import { GeneralService } from 'src/app/modules/private/services/general/general.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [ServicesService]
})
export class HomeComponent {
  tags:any;
  lastBlog:any;
  popularBlogs:any;
  urlServer = environment.server;

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private generalService: GeneralService,
    private servicesService: ServicesService,
    public router: Router
  ){ }

  ngOnInit(): void {
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

  getBlogs() {
    // this.toastr.info('cargando...', 'obteniendo los blogs')
    // this.toastr.success('Excito!!!', 'blogs recientes cargados correctamente');
    this.getLastBlogs()
    this.getPopularBlogs()
  }

  getLastBlogs() {
    this.blogService.getLastBlogs(1).subscribe(
      (data) => {
        console.log("data",data)
        this.lastBlog = data[0];
        this.lastBlog.fechaFormat = moment(new Date(this.lastBlog.dateCreated)).format('YYYY-MM-DD hh:mm A');
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getPopularBlogs() {
    this.blogService.getPopularBlogs(2).subscribe(
      (data) => {
        let newData = data;
        newData.map((item:any, index: any) => {
          item.fechaFormat = moment(new Date(item.fecha)).format('YYYY-MM-DD hh:mm A');

          const tag = this.tags.filter((t: { _id: string; }) => t._id == item.tag);

          if (tag.length > 0) {
            item.tag = {color: tag[0].color, description: tag[0].description, title: tag[0].title};
          };

          if(newData.length == index+1){
            this.popularBlogs = newData;
          };

        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  redirect(ruta: any){
    this.router.navigate([`/blog-post/${ruta}`]);
  }
}
