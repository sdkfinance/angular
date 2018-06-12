import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WithdrawalService} from '../../../../_services/withdrawal.service';
import {GatesService} from '../../../../_services/gates.service';
import {PAYMENT_METHODS_PARAMS} from '../../../../app.constants';
import {PaymentMethod} from '../../../../_enums/payment-method.enum';
import {InfoDialogComponent} from '../../../../_modules/ui/components/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-withdrawal-form',
    templateUrl: './withdrawal-form.component.html',
    styles: []
})
export class WithdrawalFormComponent implements OnInit {

    @Input() transaction;
    @Output() back = new EventEmitter();
    @Output() getResult = new EventEmitter();

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

    constructor(private withdrawalService: WithdrawalService, private gatesService: GatesService, private modal: MatDialog) {
    }

    ngOnInit() {
        this.gatesService.getFields(this.transaction.id).then(data => {
            this.options = data.options;
            this.selectOption(this.options[0]);
        }).catch();
    }

    /**
     * If fields don't have errors, makes transaction request
     * If it returns errors, shows it
     */
    makeTransaction(fields) {
        this.waiting = true;
        this.gatesService.makeTransaction(this.transaction.id, {
            optionName: this.selectedOption.name,
            fields: fields
        }).then(data => {
            this.waiting = false;
            this.getResult.emit(data);
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
