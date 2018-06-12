import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../../../_classes/transaction";
import {TransactionService} from "../../../../_services/transaction.service";

@Component({
    selector: 'app-dashboard-purchases',
    templateUrl: './dashboard-purchases.component.html',
    styleUrls: ['./dashboard-purchases.component.less']
})
export class DashboardPurchasesComponent implements OnInit {

    transactions: Transaction[] = null;

    constructor(private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.getTransactions();
    }

    getTransactions() {
        let body = {
            pageNumber: 0,
            pageSize: 10,
            sort: {
                date: "desc"
            }
        };

        this.transactionService.getTransactionList(body)
            .then(res => this.transactions = res.records)
            .catch(error => console.log(error));
    }

}
