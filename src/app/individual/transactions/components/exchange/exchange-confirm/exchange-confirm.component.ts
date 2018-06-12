import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IssuersService} from '../../../../../_services/issuers.service';
import {TransactionService} from '../../../../../_services/transaction.service';

@Component({
    selector: 'app-exchange-confirm',
    templateUrl: './exchange-confirm.component.html',
    styles: []
})
export class ExchangeConfirmComponent implements OnInit {

    /** Info about exchanger */
    @Input() exchanger;
    /** Info about amount and coins participating in exchange */
    @Input() coins;

    @Output() back = new EventEmitter();
    @Output() next = new EventEmitter();
    @Output() close = new EventEmitter();

    waiting: boolean = false;
    /** Result of exchange */
    result = null;

    constructor(private issuersService: IssuersService, private transactionsService: TransactionService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to execute exchange and updates transactions history
     */
    executeExchangeOperation() {
        this.issuersService.executeExchangeOperation(this.exchanger.id, {
            inCoin: this.coins.sellCoin.serial,
            outCoin: this.coins.buyCoin.serial,
            inAmount: this.coins.amount
        }).then(data => {
            this.waiting = false;
            this.result = data.process;
            this.transactionsService.updateTransactions();
        }).catch(() => this.waiting = false);
    }

    onBack() {
        this.back.emit();
    }

    onNext() {
        this.waiting = true;
        this.executeExchangeOperation();
    }

    onClose() {
        this.close.emit();
    }

}
