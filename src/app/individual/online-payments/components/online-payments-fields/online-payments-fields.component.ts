import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OnlinePaymentsService} from '../../../../_services/online-payments.service';

@Component({
    selector: 'app-online-payments-fields',
    templateUrl: './online-payments-fields.component.html',
    styleUrls: ['./online-payments-fields.component.less']
})
export class OnlinePaymentsFieldsComponent implements OnInit {

    /** Transaction to pay */
    @Input() transaction;
    /** Action after back button click */
    @Output() back = new EventEmitter();
    /** Action after getting result */
    @Output() result = new EventEmitter();

    /** Available payment options */
    options;
    /** Selected payment options */
    selectedOption;
    /** List of form fields */
    fields;
    /** Values in field */
    values = {};
    /** Errors in values of fields */
    errors = {};

    waiting: boolean = false;

    constructor(private paymentsService: OnlinePaymentsService) {
    }

    ngOnInit() {
        this.getFields();
    }

    /**
     * Gets fields to fill in
     */
    getFields() {
        this.paymentsService.getListOfFields(this.transaction.id)
            .then(data => {
                this.options = data.options;
                this.selectedOption = this.options[0];
                this.fields = this.selectedOption.fields;
                for (let field of this.fields) {
                    this.values[field.name] = '';
                    this.errors[field.name] = '';
                }
            })
            .catch()
    }

    /** Resets all errors */
    resetErrors() {
        for (let key in this.errors) {
            this.errors[key] = '';
        }
    }

    /**
     * If fields don't have errors, makes transaction request
     * If it returns errors, shows it
     */
    makeTransaction() {
        this.waiting = true;
        this.resetErrors();

        // Sets error if necessary fields is empty
        for (let field of this.fields) {
            if (!field.optional && !this.values[field.name].length) this.errors[field.name] = 'Please fill in this field'
        }

        // We can't make transaction if some field has error
        for (let key in this.errors) {
            if (this.errors[key].length) {
                this.waiting = false;
                return;
            }
        }

        this.paymentsService.makeTransaction(this.transaction.id, this.createBody())
            .then(data => {
                this.waiting = false;
                this.result.emit(data);
            })
            .catch(error => {
                let errors = error.errors;
                this.resetErrors();
                for (let error of errors) {
                    this.errors[error.parameter] = error.message;
                }
                this.waiting = false;
            });
    }

    /**
     * Gathers fields and values into request body as object
     * @returns {{optionName; fields: Array}}
     */
    createBody() {
        let fields = [];
        for (let key in this.values) {
            fields.push({
                name: key,
                value: this.values[key]
            });
        }

        return {
            optionName: this.selectedOption.name,
            fields: fields
        };
    }

    onBack() {
        this.transaction = null;
        this.back.emit();
    }

}
