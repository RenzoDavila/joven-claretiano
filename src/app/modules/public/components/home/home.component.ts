import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  blogs:any;
  lastBlogs:any;
  popularBlogs:any;

  constructor(
    private _blogService: BlogService,
    private toastr: ToastrService
  ){ }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.toastr.info('cargando...', 'obteniendo los blogs')
    this.getLastBlogs()
    this.getPopularBlogs()
  }

  getLastBlogs() {
    this._blogService.getLastBlogs().subscribe(
      (data) => {
        console.log("data", data)
        this.lastBlogs = data
        this.toastr.success('Excito!!!', 'blogs recientes cargados correctamente')

      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPopularBlogs() {
    this._blogService.getPopularBlogs().subscribe(
      (data) => {
        console.log("data", data)
        this.popularBlogs = data
        this.toastr.success('Excito!!!', 'blogs populares cargados correctamente')

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
