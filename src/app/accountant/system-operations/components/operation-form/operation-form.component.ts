import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {OrganizationsService} from '../../../../_services/organizations.service';
import {Coin} from '../../../../_classes/coin';
import {Organization} from '../../../../_interfaces/organization';
import {Subscription} from 'rxjs/Subscription';
import {Form} from '../../../../_classes/form/form';
import {SystemOperationsService} from '../../services/system-operations.service';

@Component({
    selector: 'app-operation-form',
    templateUrl: './operation-form.component.html',
    styleUrls: ['./operation-form.component.less']
})
export class OperationFormComponent extends Form implements OnInit, OnChanges, OnDestroy {

    /** A list of organizations which support system operations */
    @Input() organizations: Organization[];
    /** A list of coins of the selected organization */
    @Input() coins: Coin[];
    /** A label on the submit button */
    @Input() operationName: string = 'Submit';
    /** Type of system operation */
    @Input() operationType: string;
    /** Errors received after submitting  */
    @Input() errorsFromApi: string[];
    /** Submitting event */
    @Output() makeOperation = new EventEmitter();

    subscriptions: Subscription[] = [];

    constructor(private fb: FormBuilder, private orgService: OrganizationsService,
                private systemOperationsService: SystemOperationsService) {
        super();
    }

    ngOnInit() {
        this.createForm();

        this.errors = {
            'amount.required': false,
            'amount.pattern': false,
            'amount.max': false,
            'amount.min': false,
            'amount.greater': false,
            'serial.required': false,
            'fullName.pattern': false
        };
    }

    createForm() {
        this.form = this.fb.group({
            organization: [this.organizations[0].id],
            amount: ['', [Validators.required, Validators.pattern(/^[0-9]*(\.[0-9]{1,2})?$/)]],
            serial: [this.coins && this.coins[0] ? this.coins[0].serial : '', Validators.required],
            fullName: ['', Validators.required]
        });

        this.subscriptions.push(this.form.get('organization').valueChanges
            .subscribe(id => this.systemOperationsService.setOrganizationId(id)));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['coins'] && !changes['coins'].firstChange && this.coins.length) {
            this.form.get('serial').setValue(this.coins[0].serial);
        }

        if (changes['errorsFromApi'] && changes['errorsFromApi'].currentValue) {
            this.errorsFromApi.forEach(error => this.errors[error] = true);
        }
    }

    /**
     * Sends form data to the parent component
     */
    submitForm() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.makeOperation.emit({
                amount: +this.form.get('amount').value,
                serial: this.form.get('serial').value,
                fullName: this.form.get('fullName').value
            });
        }
    }

    getSelectedCoinAmount(): number {
        return this.coins.find(coin => this.form.get('serial').value === coin.serial).amount;
    }

    /**
     * Checks the form for errors
     * @returns {boolean} True if there are no errors
     */
    checkErrors() {
        if (this.form.get('amount').value && +this.form.get('amount').value < 0.01) {
            this.errors['amount.min'] = true;
        }

        if (this.operationType === 'cash_collect' && +this.form.get('amount').value > this.getSelectedCoinAmount()) {
            this.errors['amount.max'] = true;
        }
        return super.checkErrors();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
