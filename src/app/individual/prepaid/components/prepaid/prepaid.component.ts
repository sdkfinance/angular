import {Component, OnInit} from '@angular/core';
import {CoinsService} from '../../../../_services/coins.service';
import {Coin} from '../../../../_classes/coin';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {PrepaidService} from '../../../../_services/prepaid.service';

@Component({
    selector: 'app-prepaid',
    templateUrl: './prepaid.component.html',
    styles: []
})
export class PrepaidComponent implements OnInit {

    /** List of the user's coins */
    coins: Coin[];

    constructor(private coinsService: CoinsService, private titleService: Title, private prepaidService: PrepaidService) {
        this.titleService.setTitle(PAGE_TITLES.vouchers);
        TitleService.setTitle(WINDOW_TITLE.vouchers);
    }

    ngOnInit() {
        this.getCoins();
    }

    /**
     * Gets list of the user's coins
     */
    getCoins() {
        this.coinsService.getCoins().then(data => this.coins = data.coins).catch(e => e);
    }

}
