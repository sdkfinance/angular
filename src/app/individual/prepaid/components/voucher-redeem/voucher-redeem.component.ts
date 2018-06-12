import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../../_classes/coin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrepaidService} from '../../../../_services/prepaid.service';

@Component({
    selector: 'app-voucher-redeem',
    templateUrl: './voucher-redeem.component.html',
    styleUrls: ['./voucher-redeem.component.less']
})
export class VoucherRedeemComponent implements OnInit {

    /** List of the user's coin */
    @Input() coins: Coin[];

    /** Voucher redeem form */
    form: FormGroup;
    /** Info about commission */
    commission;
    /** Error message that displaying to the user */
    errorMsg: string = '';
    waiting: boolean = false;

    constructor(private fb: FormBuilder, private prepaidService: PrepaidService) {
    }

    ngOnInit() {
        // The user can't redeem voucher if one have no coins
        if (this.coins.length) {
            this.createForm();
        }
    }

    createForm() {
        this.form = this.fb.group({
            wallet: this.coins[0].serial,
            number: ['', Validators.required],
            pin: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => this.errorMsg = '');
    }

    /**
     * Checks if fields have errors
     * if there are no errors makes request to calculate voucher commission
     * if voucher with such parameters is not exist shows error
     */
    calculateCommission() {
        if (this.form.invalid) {
            this.errorMsg = 'validator.ui.not_empty_pair';
        }

        if (!this.errorMsg.length) {
            this.waiting = true;
            this.prepaidService.calculateCommissionForRedeem({
                prepaidPin: this.form.controls.pin.value,
                destSerial: this.form.controls.wallet.value
            }, this.form.controls.number.value).then(data => {
                this.commission = data;
                this.waiting = false;
            }).catch(errors => {
                this.waiting = false;
                this.errorMsg = 'validator.prepaid.not_found';
            });
        }
    }

    /**
     * Reset form and commission after closing
     */
    close() {
        this.commission = null;
        this.form.reset();
        this.form.controls.wallet.setValue(this.coins[0].serial);
    }

    back() {
        this.commission = null;
    }
}
