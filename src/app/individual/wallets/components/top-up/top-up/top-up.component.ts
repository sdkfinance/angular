import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CoinsService} from '../../../../../_services/coins.service';
import {Coin} from '../../../../../_classes/coin';
import {TopUpService} from '../../../services/top-up.service';
import {Subscription} from 'rxjs/Subscription';
import {PaymentProvider} from '../../../../../_interfaces/payment-provider';
import {PaymentMethodsService} from '../../../../../_modules/payment-methods/services/payment-methods.service';

@Component({
    selector: 'app-top-up',
    templateUrl: './top-up.component.html',
    styleUrls: ['./top-up.component.less']
})
export class TopUpComponent implements OnInit, OnDestroy {

    /** Serial number of the coin to top up */
    serial: string;
    /** Id of top up provider */
    providerId: string;
    /** Way of top up provider */
    way: string;
    /** The coin to top up */
    coin: Coin;
    /** List of the user's coins */
    coins: Coin[];
    provider: PaymentProvider;

    transaction;
    result;

    subscriptions: Subscription[] = [];

    amountFormIsShown: boolean = false;
    paymentFormIsShown: boolean = false;
    resultIsShown: boolean = false;

    constructor(private title: Title,
                private route: ActivatedRoute,
                private router: Router,
                private coinsService: CoinsService,
                private topUpService: TopUpService,
                private paymentService: PaymentMethodsService) {
        this.title.setTitle(PAGE_TITLES.topUp);
        TitleService.setTitle(WINDOW_TITLE.topUp);
    }

    ngOnInit() {
        this.serial = this.route.snapshot.params['serial'];
        this.way = this.route.snapshot.params['way'];
        this.providerId = this.route.snapshot.params['id'];
        this.getCoins();
    }

    /**
     * Gets user coins
     */
    getCoins() {
        if (!this.coinsService.coins) {
            this.coinsService.getCoins().then(data => {
                this.coins = data.coins;
                this.coinsService.coins = data.coins;
                this.checkCoin();
            });
        } else {
            this.coins = this.coinsService.coins;
            this.checkCoin();
        }
    }

    /**
     * Checks if the user has coin with serial from route
     * If coin not found redirects to coins list
     */
    checkCoin() {
        this.coin = this.coins.find(coin => this.serial === coin.serial);
        if (this.coin) {
            this.checkProvider();
        } else {
            this.router.navigate(['../../../'], {relativeTo: this.route});
        }
    }

    /**
     * Checks if the provider with id from route exist for the coin
     */
    checkProvider() {
        this.subscriptions.push(this.topUpService.getProvidersSubject(this.serial).subscribe(data => {
            if (data) {
                this.provider = data.find(p => p.accountId === this.providerId);
                if (this.provider) {
                    this.amountFormIsShown = true;
                } else {
                    this.router.navigate(['../../'], {relativeTo: this.route});
                }
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    setTransaction(transaction) {
        this.transaction = transaction;
        this.paymentService.transaction = this.transaction;
        this.amountFormIsShown = false;
        this.paymentFormIsShown = true;
    }

    setResult(result) {
        this.paymentFormIsShown = false;
        this.resultIsShown = true;
        this.result = result;
    }

    back() {
        this.transaction = null;
        this.paymentService.transaction = this.transaction;
        this.paymentFormIsShown = false;
        this.amountFormIsShown = true;
        // this.router.navigate(['../../'], {relativeTo: this.route});
    }

}
