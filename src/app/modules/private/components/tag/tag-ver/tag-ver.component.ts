import { Component } from '@angular/core';
import { TagService } from 'src/app/modules/public/services/tag/tag.service';
import { GeneralService } from '../../../services/general/general.service';
import { TagCrudService } from '../../../services/tag-crud/tag-crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-tag-ver',
  templateUrl: './tag-ver.component.html',
  styleUrls: ['./tag-ver.component.sass']
})
export class TagVerComponent {
  tags:any;
  dataExists:boolean = false;

  registers:number = 0;
  maxPerPage:number = 10;
  sort:string = "fecha";
  pagination!:number;
  page:number = 1;

  constructor(
    private tagService: TagService,
    private generalService: GeneralService,
    private tagCrudService: TagCrudService,
    private router: Router,
    private toastr: ToastrService,
    ){
  }

  ngOnInit(): void {
    moment.locale('es')
    this.getTags();
  }

  getTags(){
    this.tagService.getTags(this.maxPerPage, this.page, this.sort).subscribe(
      (data) => {
        console.log("data dasd", data);
        this.pagination = data.pagination;
        this.registers = data.registers;
        if(data.data.length == 0){
          this.dataExists = false;
          this.tags = data.data;
        }else{
          this.dataExists = true;
          this.tags = data.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteData(id: any){
    this.tagCrudService.deleteTag(id).subscribe(
      (data) => {
        this.toastr.error(data.message);
        this.getTags();
      },

      (error) => {
        console.log(error);
      }
    );
  }

  pageChange(newPag: number){
    this.page = newPag;
    this.getTags();
  }

}
