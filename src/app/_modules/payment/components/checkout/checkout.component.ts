import {Component, Output, EventEmitter, Input} from '@angular/core';
import {PaymentMethodsService} from '../../../payment-methods/services/payment-methods.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    @Input() waiting;
    @Output() onCheckout = new EventEmitter<boolean>();
    transaction;

    constructor(private paymentService: PaymentMethodsService) {
        this.transaction = this.paymentService.transaction;
    }

    checkout() {
        this.onCheckout.emit();
    }

}
