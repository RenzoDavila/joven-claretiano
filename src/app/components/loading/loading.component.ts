import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  isLoading$ = this.loadingSvc.isLoading$;
  constructor(private loadingSvc: LoadingService) { }

  ngOnInit(): void {
  }

}
