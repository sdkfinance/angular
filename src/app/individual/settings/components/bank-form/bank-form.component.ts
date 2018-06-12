import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-bank-form',
    templateUrl: './bank-form.component.html',
    styleUrls: ['./bank-form.component.less']
})
export class BankFormComponent implements OnInit {

    /** Name of next step */
    @Input() action: string;
    /** Bank to change */
    @Input() bank;
    /** True if it waits for response */
    @Input() waiting: boolean;
    /** Filled in bank details */
    @Output() bankDetails = new EventEmitter();
    /** Going to the list of banks */
    @Output() back = new EventEmitter();
    /** Form with bank details */
    form: FormGroup;

    /** List of possible errors */
    errors = {
        fullName: false,
        iban: false,
        bic: false,
        swift: false
    };

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            fullName: ['', Validators.required],
            account: [''],
            iban: ['', Validators.pattern(/^[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}$/)],
            bic: ['', Validators.pattern(/^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/)],
            swift: ['', Validators.pattern(/^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/)],
            name: [''],
            address: ['']
        });

        // if there is a bank to chang, fills in field its details
        if (this.bank) {
            this.form.controls.fullName.setValue(this.bank.details.fullName);
            this.form.controls.account.setValue(this.bank.details.account);
            this.form.controls.iban.setValue(this.bank.details.iban);
            this.form.controls.bic.setValue(this.bank.details.bic);
            this.form.controls.swift.setValue(this.bank.details.swift);
            this.form.controls.name.setValue(this.bank.details.name);
            this.form.controls.address.setValue(this.bank.details.address);
        }
    }

    /**
     * If fields don't have errors, send bank details up
     */
    onSubmit() {
        this.checkErrors();
        if (this.form.valid) {
            this.bankDetails.emit(this.createBody());
        }
    }

    /**
     * Makes data from fields into object
     * @returns object Bank details
     */
    createBody() {
        return {
            fullName: this.form.controls.fullName.value,
            account: this.form.controls.account.value || null,
            iban: this.form.controls.iban.value || null,
            bic: this.form.controls.bic.value || null,
            swift: this.form.controls.swift.value || null,
            name: this.form.controls.name.value || null,
            address: this.form.controls.address.value || null
        };
    }

    /**
     * Checks errors
     */
    checkErrors() {
        if (this.form.controls.fullName.invalid) this.errors.fullName = true;
        if (this.form.controls.iban.invalid) this.errors.iban = true;
        if (this.form.controls.bic.invalid) this.errors.bic = true;
        if (this.form.controls.swift.invalid) this.errors.swift = true;
    }

    onBack() {
        this.back.emit();
    }
}
