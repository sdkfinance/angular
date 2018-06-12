import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {defineLocale} from 'ngx-bootstrap/chronos';
import * as BsLocale from 'ngx-bootstrap/locale';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InvoicesService} from '../../../../_services/invoices.service';
import {InvoiceTemplatesService} from '../../../../_services/invoice-templates.service';
import {Coin} from '../../../../_classes/coin';
import {InvoiceTemplate} from '../../../../_interfaces/invoice-template';
import {Subscription} from 'rxjs/Subscription';
import {CardHoldsService} from '../../../../_services/card-holds.service';
import {I18nService} from '../../../../_services/i18n.service';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './invoice-form.component.html',
    styleUrls: ['./invoice-form.component.less']
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

    /** Merchant's coins */
    @Input() coins: Coin[];
    /** Invoice templates */
    @Input() templates: InvoiceTemplate[];
    /** Setting created invoice result */
    @Output() result = new EventEmitter();
    /** Creating invoice form */
    form: FormGroup;
    /** Date of tomorrow */
    tomorrow: Date;
    /** Config for BsDatepicker */
    bsConfig: Partial<BsDatepickerConfig>;
    /** True if system is waiting for response after creating request */
    waiting: boolean = false;
    /** List of subscriptions */
    subscriptions: Subscription[] = [];
    /** Creating commission */
    commission;
    /** List of available errors */
    errors = {
        nameRequired: false,
        payerContactRequired: false,
        payerContactNotFound: false,
        expiresAtRequired: false,
        expiresAtFuture: false,
        productCodeRequired: false,
        productPriceRequired: false,
        productPriceFormat: false,
        descriptionRequired: false,
        countRequired: false,
        countFormat: false,
        templateNameRequired: false
    };
    /** Types of invoice hold payment settings */
    settingsTypes = [
        {
            type: 'CARD_HOLD',
            name: 'Card hold'
        },
        {
            type: 'CARD_PAYMENT',
            name: 'Card payment'
        }
    ];

    constructor(private _localeService: BsLocaleService, private fb: FormBuilder, private holdsService: CardHoldsService,
                private invoicesService: InvoicesService, private templateService: InvoiceTemplatesService,
                private i18nService: I18nService) {
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

    ngOnInit() {
        defineLocale(this.i18nService.currentLocale.bsDatePickerConfig.locale,
            BsLocale[this.i18nService.currentLocale.bsDatePickerConfig.param]);
        this._localeService.use(this.i18nService.currentLocale.bsDatePickerConfig.locale);
        this.createForm();
    }

    /**
     * Initializes form
     */
    createForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            payerContact: ['', [Validators.required]],
            recipientCoin: [this.coins[0].serial],
            expiresAt: ['', [Validators.required]],
            productCode: ['', [Validators.required]],
            productPrice: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]],
            description: [''],
            count: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
            amount: ['', [Validators.required]],
            template: ['null'],
            saveTemplate: [false],
            updateTemplate: [false],
            templateName: ['', Validators.required],
            addSettings: false,
            paymentSettings: [this.settingsTypes[0].type]
        });

        this.subscriptions.push(this.form.get('template').valueChanges.subscribe(data => {
            if (data !== 'null') {
                const template: InvoiceTemplate = this.templates.find(t => t.id = data);
                this.form.get('name').setValue(template.name);
                this.form.get('payerContact').setValue(template.payerContact);
                this.form.get('recipientCoin').setValue(template.recipientCoin);
                this.form.get('expiresAt').setValue(new Date(template.expiresAt));
                this.form.get('productCode').setValue(template.data.productCode);
                this.form.get('productPrice').setValue(template.data.productPrice);
                this.form.get('count').setValue(template.data.count);
                this.form.get('amount').setValue(template.amount);
                this.setAmount();
            } else {
                this.form.patchValue({
                    // name: '',
                    // payerContact: '',
                    // recipientCoin: this.coins[0].serial,
                    // expiresAt: '',
                    // productCode: '',
                    // productPrice: '',
                    // description: '',
                    // count: '',
                    // amount: '',
                    saveTemplate: false
                });
            }
            Object.keys(this.errors).forEach(key => this.resetError(key));
        }));

        this.subscriptions.push(this.form.get('productPrice').valueChanges.subscribe(() => this.setAmount()));
        this.subscriptions.push(this.form.get('count').valueChanges.subscribe(() => this.setAmount()));
        this.subscriptions.push(this.form.get('recipientCoin').valueChanges.subscribe(() => this.setAmount()));
    }

    /**
     * Calculates total amount
     * @returns {number}
     */
    calculateAmount(): number {
        if (this.form.get('productPrice').valid && this.form.get('count').valid) {
            return +this.form.get('productPrice').value * +this.form.get('count').value;
        }
        return null;
    }

    /**
     * Sets total amount to form field
     */
    setAmount() {
        this.commission = null;
        const amount = this.calculateAmount();
        if (amount !== null) {
            this.calculateCommission(amount);
            this.form.get('amount').setValue(`${amount.toFixed(2)} `
                + `${this.coins.find(c => c.serial === this.form.get('recipientCoin').value).issuer.currency}`);
        } else {
            this.form.get('amount').setValue('');
        }
    }

    /**
     * Makes a request to calculate commission of invoice creating
     * @param amount
     */
    calculateCommission(amount) {
        this.invoicesService.calculateCommissionAsMerchant({
            payerContact: this.form.get('payerContact').value,
            recipientCoin: this.form.get('recipientCoin').value,
            amount: amount
        }).then(data => this.commission = data).catch(e => e);
    }

    /**
     * Makes a request to create invoice
     * @returns {Promise<any>}
     */
    createInvoice() {
        return new Promise((resolve, reject) => {
            this.invoicesService.createInvoice({
                name: this.form.get('name').value,
                payerContact: this.form.get('payerContact').value,
                recipientCoin: this.form.get('recipientCoin').value,
                data: {
                    productCode: this.form.get('productCode').value,
                    productPrice: +this.form.get('productPrice').value,
                    description: this.form.get('description').value,
                    count: +this.form.get('count').value,
                    terms: null
                },
                amount: this.calculateAmount(),
                expiresAt: new Date(this.form.get('expiresAt').value).toISOString()
            }).then(data => resolve(data)).catch(error => reject(error));
        });
    }

    /**
     * Makes a request to create new invoice template
     * @returns {Promise<any>}
     */
    createTemplate() {
        return new Promise((resolve, reject) => {
            this.templateService.createTemplate({
                name: this.form.get('templateName').value,
                invoiceIdentifier: null,
                invoiceDraft: {
                    name: this.form.get('name').value,
                    amount: this.calculateAmount(),
                    payerContact: this.form.get('payerContact').value,
                    recipientCoin: this.form.get('recipientCoin').value,
                    data: {
                        productCode: this.form.get('productCode').value,
                        productPrice: +this.form.get('productPrice').value,
                        description: this.form.get('description').value,
                        count: +this.form.get('count').value,
                        terms: null
                    },
                    expiresAt: new Date(this.form.get('expiresAt').value).toISOString()
                }
            }).then(data => resolve(data)).catch(error => reject(error));
        });
    }

    /**
     * Makes a request to adds hold payment settings for the created invoice
     * @param invoice
     */
    addPaymentSettings(invoice) {
        this.holdsService.addInvoiceHoldPaymentSettings(invoice.identifier, {
            paymentType: this.form.get('paymentSettings').value
        }).then(() => {
            this.result.emit(invoice);
            this.waiting = false;
        }).catch(() => {
            this.result.emit(invoice);
            this.waiting = false;
        });
    }

    /**
     * Checks errors, if they do not exist creates invoice and template
     */
    onCreate() {
        if (this.checkErrors()) {
            this.waiting = true;
            let requests = [this.createInvoice()];

            if (this.form.get('saveTemplate').value) {
                requests.push(this.createTemplate());
            }

            Promise.all(requests).then(data => {
                if (this.form.get('paymentSettings').value) {
                    this.addPaymentSettings((<any>data[0]).invoice);
                } else {
                    this.result.emit((<any>data[0]).invoice);
                    this.waiting = false;
                }
            }).catch((errors) => {
                this.waiting = false;
                if (errors.errors && errors.errors.some(e => e.parameter === 'payerContact')) {
                    this.errors.payerContactNotFound = true;
                }
            });
        }
    }

    /**
     * Reset specified errors
     * @param {string} errors
     */
    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    /**
     * Checks end sets errors
     * @returns {boolean} - True if there are no errors
     */
    checkErrors(): boolean {
        if (this.form.get('name').hasError('required')) {
            this.errors.nameRequired = true;
        }
        if (this.form.get('payerContact').hasError('required')) {
            this.errors.payerContactRequired = true;
        }
        if (this.form.get('expiresAt').hasError('required')) {
            this.errors.expiresAtRequired = true;
        }
        if (this.form.get('productCode').hasError('required')) {
            this.errors.productCodeRequired = true;
        }
        if (this.form.get('productPrice').hasError('required')) {
            this.errors.productPriceRequired = true;
        }
        if (this.form.get('productPrice').hasError('format')) {
            this.errors.productPriceFormat = true;
        }
        if (this.form.get('description').hasError('required')) {
            this.errors.descriptionRequired = true;
        }
        if (this.form.get('count').hasError('required')) {
            this.errors.countRequired = true;
        }
        if (this.form.get('count').hasError('format')) {
            this.errors.countFormat = true;
        }
        if (this.form.get('saveTemplate').value && this.form.get('templateName').hasError('required')) {
            this.errors.templateNameRequired = true;
        }
        if (new Date(this.form.get('expiresAt').value) < new Date()) {
            this.errors.expiresAtFuture = true;
        }

        return Object.keys(this.errors).every(key => !this.errors[key]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
