import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {CoinsService} from '../../../../_services/coins.service';
import {WithdrawalService} from '../../../../_services/withdrawal.service';

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styles: []
})
export class WithdrawalComponent implements OnInit {

    /** True if coins is getting */
    coins: boolean = false;

    constructor(private title: Title, private coinsService: CoinsService, private withdrawalService: WithdrawalService) {
        this.title.setTitle(PAGE_TITLES.withdrawal);
        TitleService.setTitle(WINDOW_TITLE.withdrawal);
    }

    ngOnInit() {
        this.getCoins();
    }

    /**
     * Makes a request to get list of the user's coins
     */
    getCoins() {
        this.coinsService.getCoins().then(data => {
            let coins = data.coins;
            this.withdrawalService.setCoins(coins.filter(coin => coin.amount > 0));
            this.coins = true;
        }).catch(error => {
            this.withdrawalService.setCoins([]);
            this.coins = true;
        });
    }

}
