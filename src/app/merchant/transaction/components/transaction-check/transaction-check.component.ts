import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../../_classes/transaction";
import {Http} from "@angular/http";
import {TransactionService} from "../../../../_services/transaction.service";

@Component({
    selector: 'app-transaction-check',
    templateUrl: './transaction-check.component.html',
    styles: []
})
export class TransactionCheckComponent implements OnInit {
    @Input() identifier: any = null;
    transactionCheck: any = null;
    isHasCheck: boolean = false;
    bonusValue: number = null;

    constructor(private http: Http, private transactionService: TransactionService) {

    }

    ngOnInit() {
        this.transactionService.getTransactionPurchases(this.identifier).then(this.onSuccessTransactionPurchases.bind(this));
        this.transactionService.getBonuses(this.identifier).then(this.setBonusValue.bind(this));
    }

    onSuccessTransactionPurchases(data) {
        this.transactionCheck = data;
        if (this.transactionCheck != 0) {
            this.isHasCheck = true;
        }
    }

    setBonusValue(data) {
        this.bonusValue = 0;
        for (let bonus of data.records) {
            this.bonusValue += bonus.value;
        }
        this.bonusValue = Math.round(this.bonusValue*100)/100;
    }

}
