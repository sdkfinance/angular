import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CardKeeperService} from '../../providers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-bank-card-type',
    templateUrl: './bank-card-type.component.html',
    styleUrls: ['./bank-card-type.component.css']
})
export class BankCardTypeComponent implements OnInit, OnDestroy {

    @Input() waiting;
    @Output() submit = new EventEmitter();

    form: FormGroup;
    public submited = false;

    constructor(private cardKeeperService: CardKeeperService, private fb: FormBuilder) {
    }

    onCheckout() {
        this.submited = true;
        if (this.form.valid) {
            this.submit.emit({
                cardNumber: this.form.get('cardNumber').value,
                month: this.form.get('month').value,
                year: this.form.get('year').value,
                nameOnCard: this.form.get('nameOnCard').value,
                cvv: this.form.get('cvv').value,
            });
        }
    }

    ngOnInit() {
        const year = new Date().getFullYear().toString().split('');
        const regex = new RegExp(`^${year[2]}[${year[3]}-9]|[${+year[2] + 1}-9][0-9]$`);

        this.form = this.fb.group({
            cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/)]],
            month: ['', [Validators.required, Validators.pattern(/^0[1-9]|1[0-2]$/)]],
            year: ['', [Validators.required, Validators.pattern(regex)]],
            nameOnCard: ['', [Validators.required, Validators.pattern(/^[A-Za-z]* [A-Za-z]*$/)]],
            cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
        });
    }

    ngOnDestroy() {
    }

}
