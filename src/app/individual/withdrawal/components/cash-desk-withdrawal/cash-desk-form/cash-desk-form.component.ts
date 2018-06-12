import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CashDesk} from '../../../../../_interfaces/cash-desk';
import {Form} from '../../../../../_classes/form/form';
import {FormBuilder, Validators} from '@angular/forms';
import {Coin} from '../../../../../_classes/coin';
import {Subscription} from 'rxjs/Subscription';
import {CashDeskWithdrawalService} from '../../../../../_services/cash-desk-withdrawal.service';

@Component({
    selector: 'app-cash-desk-form',
    templateUrl: './cash-desk-form.component.html',
    styleUrls: ['./cash-desk-form.component.less']
})
export class CashDeskFormComponent extends Form implements OnInit, OnDestroy {

    /** Cash desk used for withdrawal */
    @Input() cashDesk: CashDesk;
    /** Coin used for withdrawal */
    @Input() coin: Coin;
    /** Goes to the previous step */
    @Output() back = new EventEmitter();
    /** Sends result to the parent component */
    @Output() result = new EventEmitter();
    /** Info about commission */
    commission;
    /** True if amount invalid */
    isAmountInvalid: boolean = false;

    subscription: Subscription;

    constructor(private fb: FormBuilder, private cashDeskWithdrawalService: CashDeskWithdrawalService) {
        super();
    }

    createForm() {
        this.form = this.fb.group({
            amount: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]],
            receiverName: ['', Validators.required]
        });

        this.subscription = this.form.get('amount').valueChanges.subscribe(data => {
            this.commission = null;
            this.isAmountInvalid = true;
            this.errors['amount.max'] = false;
            if (+this.form.get('amount').value > this.coin.availableAmount) {
                this.errors['amount.max'] = true;
            } else if (+this.form.get('amount').value && !this.form.get('amount').hasError('pattern')) {
                this.isAmountInvalid = false;
                this.calculateCommission();
            }
        });
    }

    ngOnInit() {
        this.createForm();
    }

    /**
     * Makes a request to calculate commission
     */
    calculateCommission() {
        this.errors['amount.insufficient'] = false;
        this.cashDeskWithdrawalService.calculateCommissionForWithdrawal(this.cashDesk.id, {
            coin: this.coin.serial,
            amount: +this.form.get('amount').value,
            receiverName: this.form.get('receiverName').value
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
     * Makes a request to execute withdrawal
     */
    onSubmit() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.cashDeskWithdrawalService.executeWithdrawal(this.cashDesk.id, {
                coin: this.coin.serial,
                amount: +this.form.get('amount').value,
                receiverName: this.form.get('receiverName').value
            }).then(data => {
                this.result.emit(data.process);
                this.waiting = false;
            }).catch(e => this.waiting = false);
        }
    }

    /**
     * Goes to the previous step
     */
    onBack() {
        this.back.emit();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
