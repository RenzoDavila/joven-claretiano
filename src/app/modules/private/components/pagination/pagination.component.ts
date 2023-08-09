import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent {
  newPagination: number = 1;
  page: number = 1;
  @Input() registers = 0;
  @Output() pageChange = new EventEmitter<number>();

  private _pagination: number = 0;
  @Input() set pagination(value: number) {
    this._pagination = value;
    this.paginationChange(this._pagination);
  };
  get pagination(): number {
    return this._pagination;
  }

  paginationChange(pagination: number){
    this.newPagination = pagination
  }

  changePage(newPag: number){
    this.page = newPag;
    this.pageChange.emit(newPag);
  }

  changePageSelect(changePage: any){
    let newPag:number = parseInt(changePage.value);
    this.page = newPag;
    this.pageChange.emit(newPag);

  }
}
