import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../../_classes/transaction";

@Component({
  selector: 'app-transaction-table-item',
  templateUrl: './transaction-table-item.component.html',
    styleUrls: ['./transaction-table-item.component.less']
})
export class TransactionTableItemComponent implements OnInit {
    @Input() transactionItem: Transaction;
    isCheckShown: boolean = false;

  constructor() {


  }

  ngOnInit() {

  }
  toogleCheck(){
      this.isCheckShown = !this.isCheckShown;
  }

}
