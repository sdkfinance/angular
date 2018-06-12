import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Invoice} from '../../../../_interfaces/invoice';
import {PaymentProvider} from '../../../../_interfaces/payment-provider';
import {PaymentCard} from '../../../../_interfaces/payment-card';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkPAN} from '../../../../app.functions';
import {CardHoldsService} from '../../../../_services/card-holds.service';
import {MatDialog} from '@angular/material';
import {InfoDialogComponent} from '../../../../_modules/ui/components/info-dialog/info-dialog.component';
import {CardHoldItem} from '../../../../_interfaces/card-hold-item';

@Component({
    selector: 'app-create-hold-form',
    templateUrl: './create-hold-form.component.html',
    styleUrls: ['./create-hold-form.component.less']
})
export class CreateHoldFormComponent implements OnInit {

    /** Invoice to pay */
    @Input() invoice: Invoice;
    /** List of the user's payment cards */
    @Input() cards: PaymentCard[];
    /** List of providers*/
    @Input() providers: PaymentProvider[];
    /** Sending result to parent component */
    @Output() result = new EventEmitter();

    form: FormGroup;
    /** Current year */
    year;
    /** True if app is waiting for response after hold creating */
    waiting: boolean = false;
    /** Available errors */
    errors = {
        'pan.required': false,
        'pan.pattern': false,
        'expirationMonth.required': false,
        'expirationMonth.pattern': false,
        'expirationYear.required': false,
        'expirationYear.pattern': false,
        'cardholderName.required': false,
        'cardholderName.pattern': false,
        'cvv.required': false,
        'cvv.pattern': false,
    };

    constructor(private fb: FormBuilder, private holdsService: CardHoldsService, private modal: MatDialog) {
        this.year = +(new Date()).getFullYear().toString().substr(-2);
    }

    ngOnInit() {
        this.createForm();
    }

    /**
     * Initializes form
     */
    createForm() {
        this.form = this.fb.group({
            paymentCardId: 'null',
            paymentCardData: this.fb.group({
                pan: ['', [Validators.required, Validators.pattern(/^[0-9 -]+$/)]],
                expirationMonth: ['', [Validators.required, Validators.min(1), Validators.max(12), Validators.pattern(/^[0-9]{1,2}$/)]],
                expirationYear: ['', [Validators.required, Validators.min(this.year), Validators.max(99), Validators.pattern(/^[0-9]{1,2}$/)]],
                cardholderName: ['', Validators.required],
                cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]]
            }),
            providerAccountId: this.providers[0].accountId
        });
    }

    /**
     * Creates hold if there is no form errors
     */
    onSubmit() {
        if (this.checkErrors()) {
            if (this.form.get('paymentCardId').value === 'null') {
                this.createHoldWithNewCard();
            } else {
                this.createHoldWithCard();
            }
        }
    }

    /**
     * Checks errors and returns true if there are no errors
     * @returns {boolean}
     */
    checkErrors(): boolean {
        if (this.form.get('paymentCardId').value === 'null') {
            for (let field in this.form.get('paymentCardData').value) {
                if (this.form.get(`paymentCardData.${field}`).hasError('required')) {
                    this.errors[`${field}.required`] = true;
                } else if (this.form.get(`paymentCardData.${field}`).hasError('pattern') ||
                    this.form.get(`paymentCardData.${field}`).hasError('min') ||
                    this.form.get(`paymentCardData.${field}`).hasError('max')) {
                    this.errors[`${field}.pattern`] = true;
                } else if (field === 'pan' && !checkPAN(this.form.get('paymentCardData.pan').value.replace(/[- ]/g, ''))) {
                    this.errors['pan.pattern'] = true;
                }
            }
            return Object.keys(this.errors).every(e => !this.errors[e]);
        } else {
            return true;
        }
    }

    /**
     * Resets specified errors
     * @param {string} errors
     */
    resetErrors(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    /**
     * Makes a request to create hold for an invoice with attached payment card
     */
    createHoldWithCard() {
        this.waiting = true;
        this.holdsService.createCardHoldWithCard({
            invoiceIdentifier: this.invoice.identifier,
            paymentCardId: this.form.get('paymentCardId').value,
            providerAccountId: this.form.get('providerAccountId').value
        }).then(data => {
            this.waiting = false;
            this.result.emit(data.cardHold as CardHoldItem);
        }).catch(() => {
            this.waiting = false;
            this.modal.open(InfoDialogComponent, {
                width: '250px',
                data: {message: 'exception.generic'}
            });
        });
    }

    /**
     * Makes a request to create hold for an invoice with new payment card
     */
    createHoldWithNewCard() {
        this.waiting = true;
        this.holdsService.createCardHoldWithNewCard({
            invoiceIdentifier: this.invoice.identifier,
            paymentCardData: {
                pan: this.form.get('paymentCardData.pan').value.replace(/[- ]/g, ''),
                expirationMonth: +this.form.get('paymentCardData.expirationMonth').value,
                expirationYear: +this.form.get('paymentCardData.expirationYear').value,
                cardholderName: this.form.get('paymentCardData.cardholderName').value || null,
                cvv: this.form.get('paymentCardData.cvv').value
            },
            providerAccountId: this.form.get('providerAccountId').value
        }).then(data => {
            this.waiting = false;
            this.result.emit(data.cardHold as CardHoldItem);
        }).catch(() => {
            this.waiting = false;
            this.modal.open(InfoDialogComponent, {
                width: '250px',
                data: {message: 'exception.generic'}
            });
        });
    }
}
