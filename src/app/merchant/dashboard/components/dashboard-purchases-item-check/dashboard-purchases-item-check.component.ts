import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../../../_classes/transaction';
import {TransactionService} from '../../../../_services/transaction.service';

@Component({
    selector: 'app-dashboard-purchases-item-check',
    templateUrl: './dashboard-purchases-item-check.component.html',
    styleUrls: ['./dashboard-purchases-item-check.component.less']
})
export class DashboardPurchasesItemCheckComponent implements OnInit {

    @Input() purchase: Transaction;
    purchaseItems = null;

    constructor(private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.getPurchaseItems();
    }

    getPurchaseItems() {
        this.transactionService.getTransactionPurchases(this.purchase.identifier)
            .then(res => this.purchaseItems = res)
            .catch(error => console.log(error));
    }

}
