import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Coin} from '../../../../../_classes/coin';
import {Step} from '../../../../../_enums/step.enum';

@Component({
    selector: 'app-exchange-currency',
    templateUrl: './exchange-currency.component.html',
    styles: []
})
export class ExchangeCurrencyComponent implements OnInit, OnChanges {

    /** List of the user's coins */
    @Input() coins: Coin[] = null;
    /**
     * Step of exchange:
     * 1 - selecting currencies
     * 2 - selecting exchanger
     * 3 - entering amount to exchange
     * 4 - confirmation
     */
    step: Step = Step.First;
    steps = Step;
    /** Ids of issues participating in exchange */
    issuersIsd = null;
    /** Selected exchanger */
    exchanger;
    /** Coins participating in exchange */
    usedCoins;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.coins) {
            this.coins = this.coins.filter(c => c.type === 'client');
        }
    }

    /**
     * Sets issues participating in exchange and goes to step 2
     * @param issuers
     */
    viewExchangeRates(issuers) {
        this.issuersIsd = issuers;
        this.step = Step.Second;
    }

    /**
     * Sets selected exchanger and goes to step 3
     * @param exchanger
     */
    inputAmount(exchanger) {
        this.exchanger = exchanger;
        this.step = Step.Third;
    }

    /**
     * Sets used coins and goes to step 4
     * @param coins
     */
    toConfirm(coins) {
        this.usedCoins = coins;
        this.step = Step.Fourth;
    }

    /**
     * Resets all data and goes to step 1
     */
    onClose() {
        this.step = Step.First;
        this.usedCoins = null;
        this.exchanger = null;
        this.issuersIsd = null;
    }

    /**
     * Goes to previous step
     */
    onBack() {
        this.step--;
        if (this.step === Step.Second) {
            this.exchanger = null;
        } else if (this.step === Step.First) {
            this.issuersIsd = null;
        }
    }


}
