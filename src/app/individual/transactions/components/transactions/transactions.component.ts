import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, TRANSACTION_TYPES, WINDOW_TITLE} from '../../../../app.constants';
import {CoinsService} from '../../../../_services/coins.service';
import {Coin} from '../../../../_classes/coin';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styles: []
})
export class TransactionsComponent implements OnInit {

    /** List of the user's coins */
    coins: Coin[] = null;
    /** Types of transactions allowed in transactions history table (all existing types) */
    historyTypes: string[] = [];

    constructor(private titleService: Title,
                private coinsService: CoinsService) {
        TitleService.setTitle(WINDOW_TITLE.transactions);
        this.titleService.setTitle(PAGE_TITLES.transactions);
    }

    /**
     * Gets list of the user's coins from API
     */
    ngOnInit() {
        this.coinsService.getCoins().then(data => this.coins = data.coins);
        this.historyTypes = Object.keys(TRANSACTION_TYPES);
    }

}
