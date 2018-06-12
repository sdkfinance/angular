import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../../_services/transaction.service';
import {Transaction} from '../../../../_classes/transaction';
import {PAGE_TITLES} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-transactions-table',
  templateUrl: './admin-transactions-table.component.html',
  styleUrls : ['./admin-transactions-table.component.less']
})
export class AdminTransactionsTableComponent implements OnInit {
    transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService, private titleService: Title) {
      this.titleService.setTitle(PAGE_TITLES.transactions);
      this.transactionService.getAdminTransactionList().then(this.onSuccessTransactionList.bind(this));
  }

  ngOnInit() {
  }


    onSuccessTransactionList(array) {
        this.transactions = [];
        for (let item of array) {
            this.transactions.push(item);
        }
    }
}
