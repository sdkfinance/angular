import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../../_classes/coin';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PrepaidService} from '../../../../_services/prepaid.service';
import {parseNumberString} from '../../../../app.functions';

@Component({
    selector: 'app-voucher-create-form',
    templateUrl: './voucher-create-form.component.html',
    styleUrls: ['./voucher-create-form.component.less']
})
export class VoucherCreateFormComponent implements OnInit {

    /** List of the user's coins */
    @Input() coins: Coin[] = null;
    /** Action after getting result */
    @Output() result = new EventEmitter();
    /** Voucher creating form */
    form: FormGroup;
    waiting: boolean = false;

    /** Info about commission of voucher creating */
    commission;
    /** List of possible errors */
    errors = {
        notANumber: 'Invalid numeric format. Example 12 345.67',
        minAmount: 'Minimum allowed amount: 0.01',
        maxAmount: 'Maximum allowed amount: ',
        insufficient: 'Insufficient funds in the account',
        empty: 'Please fill in this field',
        wallet: 'Commission profile was not found'
    };
    /** The error that displaying to user  */
    amountErrorMsg = '';
    /** The voucher amount */
    amount;
    /** The coin where funds will be taken from */
    coin: Coin;

    constructor(private fb: FormBuilder, private prepaidService: PrepaidService) {
    }

    ngOnInit() {
        this.coin = this.coins[0];
        this.createForm();
    }

    /**
     * Creates voucher creating form
     */
    createForm() {
        this.form = this.fb.group({
            wallet: this.coins[0].serial,
            amount: ''
        });

        this.form.get('amount').valueChanges.subscribe(data => {
            // resets error and calculated commission
            this.amountErrorMsg = '';
            this.commission = null;

            // checks string for number, if it has unacceptable symbols deletes them
            if (data != this.amount) {
                let result: string = parseNumberString(data);
                this.amount = result;
                this.form.get('amount').setValue(result);
            } else if (data.length) {
                // if field is not empty check errors
                // if there are no errors calculates commission
                let amount: number = Number(data);
                if (isNaN(amount)) this.amountErrorMsg = this.errors.notANumber;
                else if (amount < 0.01) this.amountErrorMsg = this.errors.minAmount;
                else if (amount > this.coin.availableAmount) this.amountErrorMsg = this.errors.maxAmount + this.coin.availableAmount.toFixed(2);
                else this.calculateCommission();
            }
        });

        // checks errors after selecting other coin
        this.form.get('wallet').valueChanges.subscribe(data => {
            this.commission = null;
            this.coin = this.coins.find(coin => coin.serial == data);
            if (this.amount) {
                let amount: number = Number(this.amount);
                if (amount < 0.01) this.amountErrorMsg = this.errors.minAmount;
                else if (amount > this.coin.availableAmount) this.amountErrorMsg = this.errors.maxAmount + this.coin.availableAmount.toFixed(2);
                else {
                    this.amountErrorMsg = '';
                    this.calculateCommission();
                }
            }
        });
    }

    /**
     * Checks if amount field is empty, if not and there are no other errors
     * makes request to create voucher and sends result in parent component
     */
    onCreate() {
        if (!this.form.get('amount').value) {
            this.amountErrorMsg = this.errors.empty;
        } else if (this.commission && !this.amountErrorMsg) {
            this.waiting = true;
            this.prepaidService.createPrepaid({
                srcSerial: this.form.get('wallet').value,
                prepaidAmount: Number(this.amount)
            }).then(data => {
                this.waiting = false;
                this.result.emit(data);
            }).catch(() => this.waiting = false);
        }
    }

    /**
     * Makes request to calculate commission
     */
    calculateCommission() {
        this.prepaidService.calculateCommissionForCreation({
            srcCoin: this.form.get('wallet').value,
            prepaidAmount: Number(this.amount)
        }).then(data => {
            if (!this.amountErrorMsg) {
                this.commission = data;
                if (-this.commission.senderAmountPush > this.coin.availableAmount) this.amountErrorMsg = this.errors.insufficient;
            }
        }).catch(() => this.amountErrorMsg = this.errors.wallet);
    }

}
