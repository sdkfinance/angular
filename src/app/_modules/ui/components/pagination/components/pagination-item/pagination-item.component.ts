import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.less']
})
export class PaginationItemComponent implements OnInit {
    @Input() value: number;
  constructor() { }

  ngOnInit() {
  }

}
