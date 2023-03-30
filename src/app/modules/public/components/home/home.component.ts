import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  blogs:any

  constructor(
    private _blogService: BlogService,
    private toastr: ToastrService
  ){ }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.toastr.info('cargando...', 'obteniendo los blogs')
    this._blogService.getBlogs().subscribe(
      (data) => {
        console.log("data", data)
        this.blogs = data
        this.toastr.info('Excito!!!', 'blogs cargados correctamente')

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
