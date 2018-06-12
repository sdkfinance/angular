import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PaymentMethodsService} from '../../services/payment-methods.service';
import {InfoDialogComponent} from '../../../ui/components/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-new-payment-card',
    templateUrl: './new-payment-card.component.html',
    styleUrls: ['./new-payment-card.component.less']
})
export class NewPaymentCardComponent implements OnInit, OnChanges {

    @Input() waiting;
    @Input() serverErrors;
    @Output() onSubmit = new EventEmitter();

    constructor(private paymentService: PaymentMethodsService, private modal: MatDialog) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['serverErrors'] && this.serverErrors) {
            setTimeout(() => {
                this.modal.open(InfoDialogComponent, {
                    width: '250px',
                    data: {message: 'exception.generic'}
                });
            }, 2);
        }
    }

    setCard(card) {
        this.onSubmit.emit([
            {
                name: 'pan',
                value: card.cardNumber.replace(/ /g, '')
            },
            {
                name: 'cardholder_name',
                value: card.nameOnCard.toLowerCase()
            },
            {
                name: 'expiration_month',
                value: +card.month
            },
            {
                name: 'expiration_year',
                value: +card.year
            },
            {
                name: 'cvv',
                value: card.cvv
            }
        ]);
    }

}
