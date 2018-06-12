import {Component, OnInit, AfterViewInit} from '@angular/core';

import {PaymentTypeService} from './providers';
import {PAYMENT_TYPES} from './shared/payment-types';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {

    constructor(private paymentTypeService: PaymentTypeService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // this.paymentTypeService.setType(PAYMENT_TYPES.BANK_CARD);
        // console.log(PAYMENT_TYPES);
    }

}
