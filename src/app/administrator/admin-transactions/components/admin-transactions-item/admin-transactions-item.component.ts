import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-transactions-item',
  templateUrl: './admin-transactions-item.component.html',
  styleUrls: ['./admin-transactions-item.component.less']
})
export class AdminTransactionsItemComponent implements OnInit {
    @Input() transactionItem;
  constructor() { }

  ngOnInit() {
  }

}
