import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {parseNumberString} from '../../../../../app.functions';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Coin} from '../../../../../_classes/coin';
import {I18nPipe} from '../../../../../_pipes/i18n.pipe';
import {GatesService} from '../../../../../_services/gates.service';
import {Subscription} from 'rxjs/Subscription';
import {TopUpService} from '../../../services/top-up.service';

@Component({
    selector: 'app-top-up-amount',
    templateUrl: './top-up-amount.component.html',
    styles: [],
    providers: [I18nPipe]
})
export class TopUpAmountComponent implements OnInit, OnDestroy {

    /** Serial number of the coin to top up */
    @Input() serial: string;
    /** Id of top up provider */
    @Input() providerId: string;
    /** Way of top up provider */
    @Input() way: string;
    /** The coin to top up */
    @Input() coin: Coin;

    @Output() transaction = new EventEmitter();

    /** Message with error displaying to user */
    errorMsg: string = '';
    /** Top up commission */
    commission;
    /** List of possible errors messages */
    errorMessages = {
        minAmount: this.i18nPipe.transform('validator.amount.min_value', {0: '0.01'}),
        notANumber: this.i18nPipe.transform('validator.amount.format', {0: '12345.67'}),
        isEmpty: this.i18nPipe.transform('validator.required'),
    };

    waiting: boolean = false;
    form: FormGroup;

    subscriptions: Subscription[] = [];

    constructor(private fb: FormBuilder,
                private i18nPipe: I18nPipe,
                private gatesService: GatesService,
                private topUpService: TopUpService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            amount: ''
        });

        this.subscriptions.push(this.form.get('amount').valueChanges.subscribe(data => {
            this.errorMsg = '';
            let result = parseNumberString(data);
            if (result != data) {
                this.form.get('amount').setValue(result);
            } else if (data.length) {
                let amount: number = Number(data);
                if (isNaN(amount)) {
                    this.errorMsg = this.errorMessages.notANumber;
                } else if (amount < 0.01) {
                    this.errorMsg = this.errorMessages.minAmount;
                } else {
                    this.calculateCommission(amount);
                }
            }
        }));
    }

    /**
     * Makes a request to calculate commission
     * @param {number} amount
     */
    calculateCommission(amount: number) {
        if (!this.errorMsg.length) {
            this.commission = null;
            this.gatesService.calculateCommission({
                'accountId': this.providerId,
                'serial': this.serial,
                'amount': amount,
                'txType': 'TOPUP'
            }).then(data => this.commission = data).catch();
        }
    }

    /**
     * Makes a request to create top up transaction
     */
    createTransaction() {
        if (!this.form.get('amount').value) {
            this.errorMsg = this.errorMessages.isEmpty;
        }
        if (!this.errorMsg.length && this.commission) {
            this.waiting = true;
            this.gatesService.createTransaction({
                'coin': this.serial,
                'amount': this.commission.sourceAmount,
                'type': 'TOPUP',
                'method': {
                    'accountId': this.providerId,
                    'way': this.way
                }
            }).then(data => {
                this.waiting = false;
                this.transaction.emit(data.transaction);
            }).catch(error => this.waiting = false);
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
