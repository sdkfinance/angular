import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WithdrawalService} from '../../../../../_services/withdrawal.service';
import {Coin} from '../../../../../_classes/coin';
import {parseNumberString} from '../../../../../app.functions';
import {I18nPipe} from '../../../../../_pipes/i18n.pipe';

@Component({
    selector: 'app-bank-withdrawal',
    templateUrl: './bank-withdrawal.component.html',
    styles: [],
    providers: [I18nPipe]
})
export class BankWithdrawalComponent implements OnInit {

    /** The serial of the coin where the user withdraw from */
    serial: string;
    /** The coin where the user withdraw from */
    coin: Coin;
    /** Error message displaying to the user */
    errorMsg: string = '';
    form: FormGroup;
    /** True if the fields is shown */
    showFields: boolean = false;
    /** Withdrawal commission */
    commission;
    /** List of possible errors */
    errorMessages = {
        minAmount: this.i18nPipe.transform('validator.amount.min_value', {0: '0.01'}),
        maxAmount: 'validator.amount.max_value',
        notANumber: this.i18nPipe.transform('validator.amount.format', {0: '12345.67'}),
        isEmpty: this.i18nPipe.transform('validator.required'),
        insufficient: this.i18nPipe.transform('exception.coin.negative_amount')
    };

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private i18nPipe: I18nPipe,
                private withdrawalService: WithdrawalService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.serial = params['serial'];
            this.coin = this.withdrawalService.getCoins().find(coin => this.serial == coin.serial);
            if (this.coin) {
                this.createForm();
            } else {
                this.router.navigate(['../../'], {relativeTo: this.route});
            }
        });
    }

    createForm() {
        this.form = this.fb.group({
            amount: ''
        });

        this.form.get('amount').valueChanges.subscribe(data => {
            this.errorMsg = '';
            let result = parseNumberString(data);
            if (result != data) this.form.get('amount').setValue(result);
            else if (data.length) {
                let amount: number = Number(data);
                if (isNaN(amount)) this.errorMsg = this.errorMessages.notANumber;
                else if (amount > this.coin.availableAmount)
                    this.errorMsg = this.i18nPipe.transform(this.errorMessages.maxAmount, {
                        0: this.coin.availableAmount.toFixed(2)
                    });
                else if (amount < 0.01)
                    this.errorMsg = this.errorMessages.minAmount;
                else this.calculateCommission(amount);
            }
        });
    }

    /**
     * Makes a request to calculate commission for specified amount
     * @param {number} amount Amount of withdrawal
     */
    calculateCommission(amount: number) {
        if (!this.errorMsg.length) {
            this.commission = null;
            this.withdrawalService.calculateCommissionForWithdrawalViaBank({
                'coin': this.serial,
                'amount': amount
            }).then(data => this.commission = data).catch();
        }
    }

    /**
     * Checks errors and after shows form fields
     */
    onNext() {
        if (this.commission) {
            if ((-this.commission.senderAmountPush) > this.coin.availableAmount) this.errorMsg = this.errorMessages.insufficient;
            if (!this.form.get('amount').value) this.errorMsg = this.errorMessages.isEmpty;
            if (!this.errorMsg.length) this.showFields = true;
        }
    }

    /**
     * Hides form fields and shows amount field again
     */
    back() {
        this.showFields = false;
    }

}
