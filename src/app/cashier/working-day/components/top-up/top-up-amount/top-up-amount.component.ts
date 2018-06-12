import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Coin} from '../../../../../_classes/coin';
import {Form} from '../../../../../_classes/form/form';
import {Subscription} from 'rxjs/Subscription';
import {CashDeskTopUpService} from '../../../../../_services/cash-desk-top-up.service';

@Component({
    selector: 'app-top-up-amount',
    templateUrl: './top-up-amount.component.html',
    styleUrls: ['./top-up-amount.component.less']
})
export class TopUpAmountComponent extends Form implements OnInit, OnChanges, OnDestroy {

    /** Parent form */
    @Input() form: FormGroup;
    /** List of the user's coins to top up */
    @Input() coins: Coin[];

    @Output() back = new EventEmitter();
    @Output() setResult = new EventEmitter();

    waiting: boolean = false;

    subscriptions: Subscription[] = [];

    errors = {
        'amount.required': false,
        'amount.pattern': false,
        'amount.insufficient': false
    };
    /** Top up commission */
    commission;
    /** True if the amount field has errors */
    isAmountInvalid: boolean = false;

    constructor(private cashDeskTopUpService: CashDeskTopUpService) {
        super();
    }

    ngOnInit() {
        this.subscriptions.push(this.form.get('amount').valueChanges.subscribe(data => {
            this.commission = null;
            this.isAmountInvalid = true;
            if (+this.form.get('amount').value && !this.form.get('amount').hasError('pattern')) {
                this.calculateCommission();
                this.isAmountInvalid = false;
            }
        }));

        this.subscriptions.push(this.form.get('serial').valueChanges.subscribe(data => {
            this.commission = null;
            this.calculateCommission();
        }));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.coins.length) {
            this.form.get('serial').setValue(this.coins[0].serial);
        }
    }

    /**
     * Checks errors and makes top up if there are no errors
     */
    onNext() {
        if (this.checkErrors()) {
            this.makeTopUp();
        }
    }

    /**
     * Makes a request to make top up
     */
    makeTopUp() {
        this.waiting = true;
        this.cashDeskTopUpService.topUpCoin({
            amount: +this.form.get('amount').value,
            serial: this.form.get('serial').value,
            fullName: this.form.get('fullName').value,
            passportData: this.form.get('passportData').value
        }).then(data => {
            this.setResult.emit(data.process);
            this.waiting = false;
        }).catch(error => {
            this.waiting = false;
        });
    }

    /**
     * Makes a request to calculate top up commission
     */
    calculateCommission() {
        this.cashDeskTopUpService.calculateCommissionForTopUp({
            amount: +this.form.get('amount').value,
            serial: this.form.get('serial').value,
            fullName: this.form.get('fullName').value,
            passportData: this.form.get('passportData').value
        }).then(data => {
            if (!this.isAmountInvalid) {
                this.commission = data;
            }
            this.resetErrors('amount.insufficient');
        }).catch(error => {
            if (error.error.code === 'TRANSACTION_RECEIVER_CANNOT_PAY_COMMISSION') {
                this.errors['amount.insufficient'] = true;
            }
        });
    }

    /**
     * Goes to the previous step
     */
    onBack() {
        this.back.emit();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
