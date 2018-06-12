import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../../_classes/coin';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PrepaidService} from '../../../../_services/prepaid.service';

@Component({
    selector: 'app-voucher-redeem-amount',
    templateUrl: './voucher-redeem-amount.component.html',
    styles: []
})
export class VoucherRedeemAmountComponent implements OnInit {

    /** List of the user's coins */
    @Input() coins: Coin[];
    /** Info about commission */
    @Input() commission;
    /** Serial number of the prepaid coin (voucher) */
    @Input() number: string;
    /** PIN of the prepaid coin */
    @Input() pin;
    /** Closing window when voucher is prepaid */
    @Output() close = new EventEmitter();
    /** Going back */
    @Output() back = new EventEmitter();

    form: FormGroup;
    availableCoins: Coin[];
    waiting: boolean = false;
    result;

    constructor(private fb: FormBuilder, private prepaidService: PrepaidService) {
    }

    /**
     * Selects coins with the same currency as currency of voucher
     * and creates form
     */
    ngOnInit() {
        this.availableCoins = this.coins.filter(coin => coin.issuer.id == this.commission.issuer.id);
        this.form = this.fb.group({
            wallet: this.availableCoins[0].serial,
            amount: this.commission.transactionAmount.toFixed(2) + ' ' + this.commission.issuer.currency
        });
    }

    /**
     * Makes a request to redeem voucher
     */
    redeemVoucher() {
        this.waiting = true;
        this.prepaidService.redeemVoucher({
            prepaidPin: this.pin,
            destCoin: this.form.controls.wallet.value
        }, this.number).then(data => {
            this.result = data;
            this.waiting = false;
        }).catch(errors => {
            this.waiting = false;
        });
    }

    onBack() {
        this.back.emit();
    }

    onClose() {
        this.close.emit();
    }

}
