import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from "../../../../_classes/transaction";
import {TransactionService} from "../../../../_services/transaction.service";

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.less']
})
export class TransactionTableComponent implements OnInit {

    transactionList: Transaction[] = null;

    totalPages: number;
    currentPage: number;
    pageSize: number = 20;
    totalRecords: number;
    pageNumber: number = 0;

    filter = null;

    sort = {
        date: "desc",
        invoiceAmount: null
    };

    sortInfo = {
        sortDate: true,
        sortDateAsc: false,
        sortAmount: false,
        sortAmountAsc: false
    };

    constructor(private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.getTransactions();
    }

    getTransactions() {
        let body = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: this.sort,
            filter: this.filter
        };

        this.transactionService.getTransactionList(body)
            .then(response => {
                this.transactionList = response.records;
                this.totalRecords = response.totalRecords;
                this.totalPages = (<any>response).totalPages;
                this.currentPage = (<any>response).pageNumber;
            })
            .catch(error => this.transactionList = []);
    }

    onNextPage() {
        this.pageNumber = this.currentPage + 1;
        this.getTransactions();
    }

    onPreviousPage() {
        this.pageNumber = this.currentPage - 1;
        this.getTransactions();
    }

    searchTransaction(filter) {
        this.filter = filter;
        this.pageNumber = 0;

        this.totalPages = 0;
        this.transactionList = null;
        this.getTransactions();
    }

    onSortDate() {
        this.pageNumber = 0;
        this.sortInfo.sortDate = true;
        this.sortInfo.sortAmount = false;
        this.sortInfo.sortDateAsc = !this.sortInfo.sortDateAsc;
        this.sort.invoiceAmount = null;
        this.sort.date = this.sortInfo.sortDateAsc ? 'asc' : 'desc';
        this.getTransactions()
    }

    onSortAmount() {
        this.pageNumber = 0;
        this.sortInfo.sortDate = false;
        this.sortInfo.sortAmount = true;
        this.sortInfo.sortAmountAsc = !this.sortInfo.sortAmountAsc;
        this.sort.date = null;
        this.sort.invoiceAmount = this.sortInfo.sortAmountAsc ? 'asc' : 'desc';
        this.getTransactions();
    }
}
