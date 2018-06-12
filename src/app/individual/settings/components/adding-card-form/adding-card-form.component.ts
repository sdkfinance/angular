import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkPAN} from '../../../../app.functions';
import {CardService} from '../../../../_services/card.service';
import {I18nPipe} from '../../../../_pipes/i18n.pipe';


@Component({
    selector: 'app-adding-card-form',
    templateUrl: './adding-card-form.component.html',
    styleUrls: ['./adding-card-form.component.less'],
    providers: [I18nPipe]
})
export class AddingCardFormComponent implements OnInit {

    /** Selected attachment method */
    @Input() attachmentMethod;
    /** Adding card form */
    form: FormGroup;
    /** Errors for every field */
    errorMessages = {
        pan: '',
        expirationMonth: '',
        expirationYear: '',
        cardholderName: '',
        cvv: ''
    };
    /** Current year */
    year: number;
    /** List of possible errors */
    errors: any;
    /** Adding card result */
    result;
    waiting: boolean = false;

    constructor(private fb: FormBuilder, private cardService: CardService, private i18nPipe: I18nPipe) {
        this.year = +(new Date()).getFullYear().toString().substr(-2);
        this.errors = {
            required: this.i18nPipe.transform('validator.required'),
            month: this.i18nPipe.transform('validator.payment_card.month'),
            year: this.i18nPipe.transform('validator.payment_card.year', {0: this.year, 1: 99}),
            invalid: this.i18nPipe.transform('validator.general.invalid'),
            cvv: this.i18nPipe.transform('validator.payment_card.cvv')
        };
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            pan: ['', Validators.required],
            expirationMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
            expirationYear: ['', [Validators.required, Validators.min(this.year), Validators.max(99)]],
            cardholderName: [''],
            cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
        });

        // Next fields can include only digits

        this.form.controls.pan.valueChanges.subscribe(data => {
            this.errorMessages.pan = '';
            const temp = data.replace(/[^0-9 -]/g, '');
            if (data !== temp) {
                this.form.controls.pan.setValue(temp);
            }
        });
        this.form.controls.expirationMonth.valueChanges.subscribe(data => {
            this.errorMessages.expirationMonth = '';
            const temp = data.replace(/[^0-9]/g, '');
            if (data !== temp) {
                this.form.controls.expirationMonth.setValue(temp);
            }
        });
        this.form.controls.expirationYear.valueChanges.subscribe(data => {
            this.errorMessages.expirationYear = '';
            const temp = data.replace(/[^0-9]/g, '');
            if (data !== temp) {
                this.form.controls.expirationYear.setValue(temp);
            }
        });
        this.form.controls.cvv.valueChanges.subscribe(data => {
            this.errorMessages.cvv = '';
            const temp = data.replace(/[^0-9]/g, '');
            if (data !== temp) {
                this.form.controls.cvv.setValue(temp);
            }
        });
    }


    /**
     * Checks errors and if there are no errors make request to attach card
     */
    onSubmit() {
        this.checkErrors();
        if (this.form.valid) {
            this.waiting = true;
            this.cardService.attachCard({
                card: {
                    pan: this.form.controls.pan.value,
                    expirationMonth: this.form.controls.expirationMonth.value,
                    expirationYear: this.form.controls.expirationYear.value,
                    cardholderName: this.form.controls.cardholderName.value,
                    cvv: this.form.controls.cvv.value
                },
                method: {
                    accountId: this.attachmentMethod.accountId,
                    way: this.attachmentMethod.way
                }
            }).then(data => {
                this.result = data;
                this.waiting = false;
            }).catch(() => this.waiting = false);
        }
    }

    /**
     * Checks form fields for errors and displays them
     */
    checkErrors() {
        for (let field in this.form.value) {
            if (this.form.get(field).errors && this.form.get(field).errors.required) {
                this.errorMessages[field] = this.errors.required;
            }
        }
        if (!checkPAN(this.form.controls.pan.value.replace(/[- ]/g, ''))) {
            this.errorMessages.pan = this.errors.invalid;
        }
        if (this.form.controls.expirationMonth.errors &&
            (this.form.controls.expirationMonth.errors.min || this.form.controls.expirationMonth.errors.max)) {
            this.errorMessages.expirationMonth = this.errors.month;
        }
        if (this.form.controls.expirationYear.errors &&
            (this.form.controls.expirationYear.errors.min || this.form.controls.expirationYear.errors.max)) {
            this.errorMessages.expirationYear = this.errors.year;
        }
        if (this.form.controls.cvv.errors &&
            (this.form.controls.cvv.errors.minlength || this.form.controls.cvv.errors.maxlength)) {
            this.errorMessages.cvv = this.errors.cvv;
        }
    }
}

