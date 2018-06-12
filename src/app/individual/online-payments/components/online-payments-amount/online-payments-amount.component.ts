import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {OnlinePaymentsService} from '../../../../_services/online-payments.service';
import {Coin} from '../../../../_classes/coin';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CoinsService} from '../../../../_services/coins.service';
import {parseNumberString} from '../../../../app.functions';
import {I18nPipe} from '../../../../_pipes/i18n.pipe';

@Component({
    selector: 'app-online-payments-amount',
    templateUrl: './online-payments-amount.component.html',
    styleUrls: ['./online-payments-amount.component.less'],
    providers: [I18nPipe]
})
export class OnlinePaymentsAmountComponent implements OnInit, OnChanges {

    /** Selected service for payment */
    @Input() service;
    /** Action after creating purchase */
    @Output() create = new EventEmitter();
    /** List of the user's coins */
    coins: Coin[];
    /** Selected user coin */
    selectedCoin: Coin;
    /** Available currency for service payment */
    selectedCurrency;
    /** Object with info about commission */
    commission;
    /** Message with current error */
    errorMsg: string = '';
    /** List with possible errors */
    errorMessages = {
        minAmount: 'validator.amount.min_value',
        maxAmount: 'validator.amount.max_value: ',
        notANumber: 'validator.amount.format',
        isEmpty: 'validator.required',
    };

    waiting: boolean = false;
    form: FormGroup;

    constructor(private paymentsService: OnlinePaymentsService, private i18nPipe: I18nPipe,
                private fb: FormBuilder, private coinsService: CoinsService) {
    }

    ngOnInit() {
    }

    /**
     * When service is set, makes the service currency as selected
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.service && changes.service.currentValue) {
            this.selectedCurrency = this.service.currencies[0];
            this.getCoins();
        }
    }

    createForm() {
        this.form = this.fb.group({
            wallet: this.coins[0].serial,
            amount: ''
        });

        this.form.get('wallet').valueChanges.subscribe(data => {
            this.selectedCoin = this.coins.find(coin => coin.serial === data);
            this.form.get('amount').setValue(this.form.get('amount').value);
        });

        this.form.get('amount').valueChanges.subscribe(data => {
            // reset errors
            this.errorMsg = '';
            // selects only digits from string
            let result = parseNumberString(data);
            // if input string has not only digit, changes it
            if (result !== data) {
                this.form.get('amount').setValue(result);
            } else if (data.length) {
                // sets errors is it is necessary, if there are no errors, calculates commission
                let amount: number = Number(data);
                if (isNaN(amount)) {
                    // must be a number
                    this.errorMsg = this.i18nPipe.transform(this.errorMessages.notANumber, {0: '12345.67'});
                } else if (amount > this.selectedCoin.availableAmount ||
                    this.selectedCurrency.maxAmount && amount > this.selectedCurrency.maxAmount) {
                    // must be less than the coin amount and max amount
                    this.errorMsg = this.i18nPipe.transform(this.errorMessages.maxAmount, {
                        0: (this.selectedCurrency.maxAmount && this.selectedCurrency.maxAmount > this.selectedCoin.availableAmount ?
                            this.selectedCoin.availableAmount : this.selectedCurrency.maxAmount).toFixed(2)
                    });
                } else if (amount < this.selectedCurrency.minAmount) {
                    // must be greater than min amount
                    this.errorMsg = this.i18nPipe.transform(this.errorMessages.minAmount, {
                        0: this.selectedCurrency.minAmount.toFixed(2)
                    });
                } else {
                    this.calculateCommission();
                }
            }
        });
    }

    /**
     * Gets the user's coins from API and sets coin with the service currency as selected
     */
    getCoins() {
        this.coinsService.getCoins().then(data => {
            let coins: Coin[] = data.coins;
            this.coins = coins.filter(el => el.issuer.currency === this.selectedCurrency.currency.code);
            this.selectedCoin = this.coins[0];
            this.createForm();
        }).catch();
    }

    /**
     * Makes request to calculate commission
     */
    calculateCommission() {
        let amount: number = Number(this.form.get('amount').value);
        this.commission = null;
        this.paymentsService.calculateCommission({
            productId: this.service.id,
            serial: this.selectedCoin.serial,
            amount: amount
        }).then(data => this.commission = data).catch();
    }


    /**
     * If there are no errors makes request to create transaction for payment
     */
    createPurchase() {
        let amount: number = Number(this.form.get('amount').value);

        if (!this.form.get('amount').value.length) {
            this.errorMsg = this.i18nPipe.transform(this.errorMessages.isEmpty);
        }
        if (!this.errorMsg.length && this.commission) {
            this.waiting = true;
            this.paymentsService.createPurchase({
                productId: this.service.id,
                serial: this.selectedCoin.serial,
                amount: amount
            }).then(data => {
                this.create.emit(data.transaction);
                this.waiting = false;
            }).catch(() => this.waiting = false);
        }
    }

}
