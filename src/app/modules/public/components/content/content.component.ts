import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'public-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent {
  collapse:boolean = false
  constructor(public router: Router) {}

  ngOnInit(): void {
  }

  AfterViewInit(): void{
  }

  changeCollapse(change:boolean){
    this.collapse = change
  }
}
