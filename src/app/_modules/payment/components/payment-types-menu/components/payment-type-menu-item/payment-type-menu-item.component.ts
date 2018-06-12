import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {PaymentTypeService} from '../../../../providers';
import {PAYMENT_TYPES} from '../../../../shared/payment-types';

@Component({
    selector: 'app-payment-type-menu-item',
    templateUrl: './payment-type-menu-item.component.html',
    styleUrls: ['./payment-type-menu-item.component.css']
})
export class PaymentTypeMenuItemComponent implements OnInit, OnDestroy {
    @Input() name: string;
    public type: string;
    public isActive: boolean;
    private subscription: Subscription;

    constructor(private paymentTypeService: PaymentTypeService) {
    }

    ngOnInit() {
        this.type = PAYMENT_TYPES[this.name];
        this.subscription = this.paymentTypeService.type$.subscribe(
            activeType => {
                this.isActive = activeType === this.type;
            },
        );
        this.isActive = this.type === PAYMENT_TYPES.BANK_CARD;
    }

    public onClick() {
        this.paymentTypeService.setType(this.name);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
