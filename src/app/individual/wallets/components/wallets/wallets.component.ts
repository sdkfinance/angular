import {Component, OnDestroy, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';
import {CoinsService} from '../../../../_services/coins.service';
import {Coin} from '../../../../_classes/coin';
import {IssuersService} from '../../../../_services/issuers.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-wallets',
    templateUrl: './wallets.component.html',
    styles: []
})
export class WalletsComponent implements OnInit, OnDestroy {

    /** List of the user's coins */
    coins: Coin[] = null;
    /** List of all issuers */
    issuers: any[] = null;
    /** List of issuers with which the user doesn't have coins */
    issuersList: any[] = null;

    subscription: Subscription;

    constructor(private coinsService: CoinsService, private issuersService: IssuersService, private title: Title) {
        this.title.setTitle(PAGE_TITLES.coins);
        TitleService.setTitle(WINDOW_TITLE.coins);
    }

    ngOnInit() {
        this.getCoins();
    }

    /**
     * Makes a request to get the user's coins and after gets all issuers
     */
    getCoins() {
        this.subscription = this.coinsService.getCoinsList().subscribe(data => {
            this.coins = data.coins;
            this.getIssuers();
        });
        this.coinsService.updateCoinsList();
    }

    /**
     * Makes a request to get all issuers
     */
    getIssuers() {
        this.issuersService.getIssuers().then(data => {
            this.issuers = data.records;
            this.createIssuersList();
        });
    }

    /**
     * Creates list of issuers with which the user doesn't have coins
     */
    createIssuersList() {
        this.issuersList = [];
        for (let issuer of this.issuers) {
            if (!this.isCoinWithIssuerExist(issuer) && issuer.active) {
                this.issuersList.push(issuer);
            }
        }
    }

    /**
     * Checks if the user has coin with specified issuer
     * @param issuer Issuer for comparison
     * @returns {boolean} True if coin exist
     */
    isCoinWithIssuerExist(issuer) {
        return this.coins.some(coin => coin.issuer.sn === issuer.sn);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
