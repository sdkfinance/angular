import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-check-table',
  templateUrl: './transaction-check-table.component.html',
    styleUrls: ['./transaction-check-table.component.less']
})
export class TransactionCheckTableComponent implements OnInit {

    @Input() checks: any;/*
    @Input() isHasCheck: boolean = false;*/
  constructor() {

  }

  ngOnInit() {
  }

}
