import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PaymentTypeService} from '../../providers/';
import {PAYMENT_TYPES} from '../../shared/payment-types';

@Component({
    selector: 'app-payment-type',
    templateUrl: './payment-type.component.html',
    styleUrls: ['./payment-type.component.css']
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
    public type: string;
    private subscription: Subscription;
    public types = PAYMENT_TYPES;

    constructor(private paymentTypeService: PaymentTypeService) {
    }

    ngOnInit() {
        this.subscription = this.paymentTypeService.type$.subscribe((activeType) => {
            this.type = activeType;
        });
        this.type = PAYMENT_TYPES.BANK_CARD;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
