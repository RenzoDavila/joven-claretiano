import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.sass']
})
export class BlogPostComponent implements OnInit {
  id: any ;
  blog: any;

  constructor(private aRoute: ActivatedRoute, private _blogService: BlogService,){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    moment.locale('es')
    this.getBlog(this.id);
  }

  getBlog(id: string){
    this._blogService.getBlog(id).subscribe(
      (data) => {
        console.log("data", data)
        this.blog = data
        this.blog.fechaFormat = moment(new Date(this.blog.fecha)).format('MMM Do [Del] YYYY [a las] hh:mm:ss');

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
