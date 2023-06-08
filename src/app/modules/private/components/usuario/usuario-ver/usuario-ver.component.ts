import { Component } from '@angular/core';
import { BlogService } from 'src/app/modules/public/services/blog/blog.service';
import { GeneralService } from '../../../services/general/general.service';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-ver',
  templateUrl: './usuario-ver.component.html',
  styleUrls: ['./usuario-ver.component.sass']
})
export class UsuarioVerComponent {
  blogs:any;
  tags:any;

  constructor(
    private _blogService: BlogService,
    private generalService: GeneralService,
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
            console.log("this.blogs", this.blogs)
          };

        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
