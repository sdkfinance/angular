import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WithdrawalService} from '../../../../_services/withdrawal.service';
import {Coin} from '../../../../_classes/coin';
import {FormBuilder, FormGroup} from '@angular/forms';
import {parseNumberString} from '../../../../app.functions';
import {I18nPipe} from '../../../../_pipes/i18n.pipe';
import {GatesService} from '../../../../_services/gates.service';

@Component({
    selector: 'app-withdrawal-amount',
    templateUrl: './withdrawal-amount.component.html',
    styles: [],
    providers: [I18nPipe]
})
export class WithdrawalAmountComponent implements OnInit {

    @Output() getTransaction = new EventEmitter();
    /** Serial number of the coin where funds will be taken from */
    serial: string;
    /** Id of withdrawal provider */
    providerId: string;
    /** Way of withdrawal provider */
    way: string;
    /** The coin where funds will be taken from */
    coin: Coin;
    /** Message with error displaying to user */
    errorMsg: string = '';
    /** Withdrawal commission */
    commission;
    /** List of possible errors messages */
    errorMessages = {
        minAmount: this.i18nPipe.transform('validator.amount.min_value', {0: '0.01'}),
        maxAmount: 'validator.amount.max_value',
        notANumber: this.i18nPipe.transform('validator.amount.format', {0: '12345.67'}),
        isEmpty: this.i18nPipe.transform('validator.required'),
    };

    form: FormGroup;
    waiting: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private i18nPipe: I18nPipe,
                private withdrawalService: WithdrawalService, private gatesService: GatesService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.serial = params['serial'];
            this.way = params['way'];
            this.providerId = params['id'];
            this.coin = this.withdrawalService.getCoins().find(coin => this.serial === coin.serial);
            if (this.coin) {
                this.createForm();
            } else {
                this.router.navigate(['../../../'], {relativeTo: this.route});
            }
        });
    }

    createForm() {
        this.form = this.fb.group({
            amount: ''
        });

        // Takes only digits from input and checks amount for errors
        // if there are no errors calculates commission
        this.form.get('amount').valueChanges.subscribe(data => {
            this.errorMsg = '';
            let result = parseNumberString(data);
            if (result !== data) {
                this.form.get('amount').setValue(result);
            } else if (data.length) {
                let amount: number = Number(data);
                if (isNaN(amount)) {
                    this.errorMsg = this.errorMessages.notANumber;
                } else if (amount > this.coin.availableAmount) {
                    this.errorMsg = this.i18nPipe.transform(this.errorMessages.maxAmount, {
                        0: this.coin.availableAmount.toFixed(2)
                    });
                } else if (amount < 0.01) {
                    this.errorMsg = this.errorMessages.minAmount;
                } else {
                    this.calculateCommission(amount);
                }
            }
        });
    }

    /**
     * Makes a request to calculate withdrawal commission for specified amount
     * @param {number} amount Amount of withdrawal
     */
    calculateCommission(amount: number) {
        if (!this.errorMsg.length) {
            this.commission = null;
            this.gatesService.calculateCommission({
                'accountId': this.providerId,
                'serial': this.serial,
                'amount': amount,
                'txType': 'REDEEM'
            }).then(data => this.commission = data).catch();
        }
    }

    /**
     * Makes a request to create withdrawal transaction
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
                'type': 'REDEEM',
                'method': {
                    'accountId': this.providerId,
                    'way': this.way
                }
            }).then(data => {
                this.waiting = false;
                this.getTransaction.emit(data.transaction);
            }).catch(e => this.waiting = false);
        }
    }
}
