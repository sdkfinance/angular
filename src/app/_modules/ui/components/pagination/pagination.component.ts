import {Component, Input, OnInit} from '@angular/core';
import {Pagination} from '../../../../_classes/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: []
})
export class PaginationComponent implements OnInit {
    @Input() currentPagination: Pagination;
    pagination: Pagination;
  constructor() {

  }

  ngOnInit() {
      this.pagination = new Pagination(this.currentPagination);
  }

}
