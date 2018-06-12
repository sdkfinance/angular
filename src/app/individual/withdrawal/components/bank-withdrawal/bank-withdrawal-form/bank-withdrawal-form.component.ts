import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WithdrawalService} from '../../../../../_services/withdrawal.service';

@Component({
    selector: 'app-bank-withdrawal-form',
    templateUrl: './bank-withdrawal-form.component.html',
    styles: []
})
export class BankWithdrawalFormComponent implements OnInit {

    /** Calculated withdrawal commission */
    @Input() commission;
    /** The serial of the coin where the user withdraw from */
    @Input() serial: string;
    @Output() back = new EventEmitter();
    /** The serial of the coin where the user withdraw from */
    errors = {
        fullName: false,
        iban: false,
        bic: false,
        swift: false
    };

    form: FormGroup;
    waiting: boolean = false;
    result;

    constructor(private fb: FormBuilder, private withdrawalService: WithdrawalService) {
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
    }

    /**
     * Makes a request to perform withdrawal via bank
     */
    onSubmit() {
        this.checkErrors();
        if (this.form.valid) {
            this.waiting = true;
            this.withdrawalService.performWithdrawalViaBank(this.createBody())
                .then(data => {
                    this.result = data;
                    this.waiting = false;
                })
                .catch(() => this.waiting = false);
        }
    }

    /**
     * Builds request body with bank details
     * @returns request body
     */
    createBody() {
        return {
            coin: this.serial,
            amount: this.commission.transactionAmount,
            bankDetails: {
                fullName: this.form.controls.fullName.value,
                account: this.form.controls.account.value || null,
                iban: this.form.controls.iban.value || null,
                bic: this.form.controls.bic.value || null,
                swift: this.form.controls.swift.value || null,
                name: this.form.controls.name.value || null,
                address: this.form.controls.address.value || null,
            }
        };
    }

    /**
     * Checks errors and shows relevant messages
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
