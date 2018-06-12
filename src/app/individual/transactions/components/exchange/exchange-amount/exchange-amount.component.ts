import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../../../_classes/coin';
import {IssuersService} from '../../../../../_services/issuers.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {parseNumberString} from '../../../../../app.functions';
import {I18nPipe} from '../../../../../_pipes/i18n.pipe';

@Component({
    selector: 'app-exchange-amount',
    templateUrl: './exchange-amount.component.html',
    styles: [],
    providers: [I18nPipe]
})
export class ExchangeAmountComponent implements OnInit {

    /** List of the user's coins */
    @Input() coins: Coin[];
    /** Ids of issuers participating in exchange */
    @Input() issuersIsd;
    /** Info about exchanger */
    @Input() exchanger;

    @Output() next = new EventEmitter();
    @Output() back = new EventEmitter();

    /** Coin with currency the user is going to sell */
    sellCoin: Coin = null;
    /** Coin with currency the user is going to buy */
    buyCoin: Coin = null;

    /** String containing sell amount */
    sellAmountTemp: string;
    /** String containing buy amount */
    buyAmountTemp: string;

    /** Info about exchange commission */
    commission = null;
    /** Error message relevant to sell amount field */
    sellErrorMsg: string = null;
    /** Error message relevant to buy amount field */
    buyErrorMsg: string = null;
    /** List of possible error messages */
    errorsMessages;

    form: FormGroup;
    waiting = false;

    constructor(private issuersService: IssuersService, private fb: FormBuilder, private i18nPipe: I18nPipe) {
    }

    ngOnInit() {
        this.findCoins();
        this.createForm();
        this.errorsMessages = {
            notANumber: this.i18nPipe.transform('validator.amount.format', {0: '12345.67'}),
            amount: this.i18nPipe.transform('validator.amount.max_value', {0: this.sellCoin.availableAmount}),
            isEmpty: this.i18nPipe.transform('validator.required'),
            minAmount: this.i18nPipe.transform('validator.amount.min_value', {0: '0.01'})
        };
    }

    createForm() {
        this.form = this.fb.group({
            sell: '',
            buy: ''
        });

        this.form.get('sell').valueChanges.subscribe(data => {
            this.sellErrorMsg = null; // resets errors
            if (data !== this.sellAmountTemp) {
                // takes only digits from string
                let result: string = parseNumberString(data);
                this.sellAmountTemp = result;
                // checks errors
                if (result.length) {
                    let amount: number = Number(result);
                    if (isNaN(amount)) {
                        this.sellErrorMsg = this.errorsMessages.notANumber;
                    } else if (amount > this.sellCoin.availableAmount) {
                        this.sellErrorMsg = this.errorsMessages.amount;
                    } else {
                        // recounts and sets buy amount
                        this.buyAmountTemp = (amount * this.exchanger.rate).toFixed(2);
                        this.form.get('buy').setValue(this.buyAmountTemp);
                    }
                } else {
                    // resets buy amount
                    this.buyAmountTemp = '';
                    this.form.get('buy').setValue(this.buyAmountTemp);
                }
            }
        });

        this.form.get('buy').valueChanges.subscribe(data => {
            this.buyErrorMsg = null; // resets errors
            if (data !== this.buyAmountTemp) {
                // takes only digits from string
                let result: string = parseNumberString(data);
                this.buyAmountTemp = result;
                // checks errors
                if (result.length) {
                    let amount: number = Number(result);
                    if (isNaN(amount)) {
                        this.buyErrorMsg = this.errorsMessages.notANumber;
                    } else {
                        // recounts and sets sell amount
                        let sellAmount = (amount / this.exchanger.rate).toFixed(2);
                        this.form.get('sell').setValue(sellAmount);
                    }
                }
                this.form.get('buy').setValue(result);
            }
        });
    }

    /**
     * Finds coins with selected currencies for exchange
     */
    findCoins() {
        this.sellCoin = this.coins.find(coin => coin.issuer.id == this.issuersIsd.inIssuerId);
        this.buyCoin = this.coins.find(coin => coin.issuer.id == this.issuersIsd.outIssuerId);
    }

    onBack() {
        this.back.emit();
    }

    /**
     * Checks errors, if there are no errors calculates commission
     */
    onNext() {
        if (this.sellErrorMsg) {
            return;
        }
        if (!this.form.get('sell').value.length) {
            this.sellErrorMsg = this.errorsMessages.isEmpty;
        } else if (this.form.get('sell').value < 0.01) {
            this.sellErrorMsg = this.errorsMessages.minAmount;
        } else if (this.form.get('buy').value < 0.01) {
            this.buyErrorMsg = this.errorsMessages.minAmount;
        } else {
            this.waiting = true;
            this.calculateCommission();
        }
    }

    toNumber(string) {
        return parseFloat(string) || 0;
    }

    /**
     * Makes request to calculate commission
     */
    calculateCommission() {
        this.issuersService.calculateCommission(this.exchanger.id, {
            inCoin: this.sellCoin.serial,
            outCoin: this.buyCoin.serial,
            inAmount: Number(this.form.get('sell').value)
        }).then(data => {
            this.commission = data;
            this.waiting = false;
            this.next.emit({
                sellCoin: this.sellCoin,
                buyCoin: this.buyCoin,
                amount: Number(this.form.get('sell').value),
                commission: this.commission
            });
        }).catch(() => this.waiting = false);
    }

}
