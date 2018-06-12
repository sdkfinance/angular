import {Component, Input, OnInit} from '@angular/core';
import {CoinsService} from '../../../../../_services/coins.service';
import {Coin} from '../../../../../_classes/coin';
import {TransactionService} from '../../../../../_services/transaction.service';

@Component({
    selector: 'app-transfers',
    templateUrl: './transfers.component.html',
    styles: []
})
export class TransfersComponent implements OnInit {

    /** The user's coins list */
    @Input() coins: Coin[] = null;
    /** transfer result data */
    result = null;
    /** Currency of made transfer */
    currency = null;

    constructor(private coinsService: CoinsService, private transactionsService: TransactionService) {
    }

    ngOnInit() {
    }

    /**
     * Sets result data
     * @param result
     */
    setResult(result) {
        this.result = result;
        this.transactionsService.updateTransactions();
    }

    /**
     * Sets currency of made transfer
     * @param currency
     */
    setCurrency(currency) {
        this.currency = currency;
    }

    /**
     * Reset result data and updates coins list
     */
    resetResult() {
        this.result = null;
        this.coins = null;
        this.currency = null;
        this.coinsService.getCoins().then(data => this.coins = data.coins).catch(e => e);
    }
}
