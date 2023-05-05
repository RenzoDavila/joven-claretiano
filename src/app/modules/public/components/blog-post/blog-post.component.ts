import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';

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
    this.getBlog(this.id);
  }

  getBlog(id: string){
    this._blogService.getBlog(id).subscribe(
      (data) => {
        console.log("data", data)
        this.blog = data

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
