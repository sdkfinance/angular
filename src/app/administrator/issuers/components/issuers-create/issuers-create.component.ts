import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../../../_interfaces/currency';
import {IssuersService} from '../../../../_services/issuers.service';

@Component({
    selector: 'app-issuers-create',
    templateUrl: './issuers-create.component.html',
    styles: []
})
export class IssuersCreateComponent implements OnInit {

    form: FormGroup;
    /** List of system currencies */
    currencies: Currency[];
    waiting: boolean = false;

    /** Possible errors */
    errors = {
        snPrefixRequired: false,
        nameRequired: false,
        descriptionRequired: false,
        orderNumberRequired: false,
        orderQuoteRequired: false,
        orderNumberFormat: false,
        orderQuoteFormat: false
    };

    constructor(private fb: FormBuilder, private issuersService: IssuersService) {
    }

    ngOnInit() {
        this.getCurrencies();
    }

    createForm() {
        this.form = this.fb.group({
            snPrefix: ['', Validators.required],
            currencyCode: [this.currencies[0].code],
            name: ['', Validators.required],
            description: ['', Validators.required],
            active: false,
            orderNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            orderQuote: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
        });
    }

    getCurrencies() {
        this.issuersService.getCurrencies().then(data => {
            this.currencies = data.currencies;
            this.createForm();
        }).catch();
    }

    onCreate() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.issuersService.createIssuer({
                snPrefix: this.form.get('snPrefix').value,
                currencyCode: this.form.get('currencyCode').value,
                name: this.form.get('name').value,
                description: this.form.get('description').value,
                active: this.form.get('active').value,
                orderNumber: parseInt(this.form.get('orderNumber').value, 10),
                orderQuote: parseInt(this.form.get('orderQuote').value, 10)
            }).then(data => {
                this.issuersService.updateIssuersSubject();
                this.form.reset({
                    currencyCode: this.currencies[0].code
                });
                this.waiting = false;
            }).catch(() => this.waiting = false);
        }
    }

    /**
     * Returns true if the form is valid
     * @returns {boolean}
     */
    checkErrors(): boolean {
        if (this.form.controls['snPrefix'].hasError('required')) {
            this.errors.snPrefixRequired = true;
        }
        if (this.form.controls['name'].hasError('required')) {
            this.errors.nameRequired = true;
        }
        if (this.form.controls['description'].hasError('required')) {
            this.errors.descriptionRequired = true;
        }
        if (this.form.controls['orderNumber'].hasError('required')) {
            this.errors.orderNumberRequired = true;
        }
        if (this.form.controls['orderNumber'].hasError('pattern')) {
            this.errors.orderNumberFormat = true;
        }
        if (this.form.controls['orderQuote'].hasError('required')) {
            this.errors.orderQuoteRequired = true;
        }
        if (this.form.controls['orderQuote'].hasError('pattern')) {
            this.errors.orderQuoteFormat = true;
        }
        return !Object.keys(this.errors).find(key => this.errors[key]);
    }

    /**
     * Resets specified errors
     * @param {string} errors
     */
    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

}
