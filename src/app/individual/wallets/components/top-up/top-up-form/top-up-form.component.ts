import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GatesService} from '../../../../../_services/gates.service';
import {PaymentProvider} from '../../../../../_interfaces/payment-provider';
import {PAYMENT_METHODS_PARAMS} from '../../../../../app.constants';
import {InfoDialogComponent} from '../../../../../_modules/ui/components/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material';
import {PaymentMethod} from '../../../../../_enums/payment-method.enum';

@Component({
    selector: 'app-top-up-form',
    templateUrl: './top-up-form.component.html',
    styleUrls: ['./top-up-form.component.less']
})
export class TopUpFormComponent implements OnInit {

    /** Top up transaction */
    @Input() transaction;
    /** Provider used for payment */
    @Input() provider: PaymentProvider;
    /** Goes back to amount form */
    @Output() back = new EventEmitter();
    /** Sends result after form submitting */
    @Output() result = new EventEmitter();
    /** Available top up options */
    options;
    /** Selected top up options */
    selectedOption;
    /** List of the form fields */
    fields;
    /** Errors received from the server after submitting */
    serverErrors;
    /** True if the form is submitting */
    waiting: boolean = false;
    /** Enum of payment methods */
    paymentMethods = PaymentMethod;
    /** Selected payment method */
    paymentMethod: PaymentMethod;

    constructor(private gatesService: GatesService, private modal: MatDialog) {
    }

    ngOnInit() {
        this.getOptions();
    }

    /**
     * Makes a request to get options with their fields, and after selects the first option
     */
    getOptions() {
        this.gatesService.getFields(this.transaction.id).then(data => {
            this.options = data.options;
            this.selectOption(this.options[0]);
        }).catch();
    }

    /**
     * Makes a request to submit the form to make a transaction
     */
    makeTransaction(fields) {
        this.waiting = true;
        this.gatesService.makeTransaction(this.transaction.id, {
            optionName: this.selectedOption.name,
            fields: fields
        }).then(data => {
            this.waiting = false;
            this.serverErrors = null;
            this.result.emit(data);
        }).catch(error => {
            this.serverErrors = error.error.errors;
            if (error.error.code === 'UNKNOWN_ERROR') {
                this.modal.open(InfoDialogComponent, {
                    width: '250px',
                    data: {message: 'exception.generic'}
                });
            }
            this.waiting = false;
        });
    }

    selectOption(option) {
        this.selectedOption = option;
        this.fields = this.selectedOption.fields;

        if (!this.fields.length) {
            this.makeTransaction([]);
        }

        if (this.selectedOption.name === PAYMENT_METHODS_PARAMS.new_payment_card.option.name) {
            this.paymentMethod = this.paymentMethods.NewPaymentCard;
        } else if (this.selectedOption.name === PAYMENT_METHODS_PARAMS.existing_card.option.name) {
            this.paymentMethod = this.paymentMethods.ExistingCard;
        } else {
            this.paymentMethod = this.paymentMethods.BaseForm;
        }
    }

    onBack() {
        this.back.emit();
    }

}
