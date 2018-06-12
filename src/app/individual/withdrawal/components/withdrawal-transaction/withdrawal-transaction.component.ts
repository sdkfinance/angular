import {Component, OnInit} from '@angular/core';
import {Step} from '../../../../_enums/step.enum';

@Component({
    selector: 'app-withdrawal-transaction',
    templateUrl: './withdrawal-transaction.component.html',
    styleUrls: ['./withdrawal-transaction.component.less']
})
export class WithdrawalTransactionComponent implements OnInit {

    transaction;
    result;

    steps = Step;
    step: Step = Step.First;

    constructor() {
    }

    ngOnInit() {
    }

    setTransaction(transaction) {
        this.transaction = transaction;
        this.step = Step.Second;
    }

    setResult(result) {
        this.result = result;
        this.step = Step.Third;
    }

    back() {
        this.step--;
    }

}
