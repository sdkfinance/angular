import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LIMIT_PROFILE_TYPES} from '../../../../../app.constants';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../../../_interfaces/product';

@Component({
    selector: 'app-add-product-limit',
    templateUrl: './add-product-limit.component.html',
    styleUrls: ['./add-product-limit.component.less']
})
export class AddProductLimitComponent implements OnInit, OnDestroy {

    products: Product[];
    commissionProfile: GateCommissionProfile;
    /** Time unit types */
    timeUnits = LIMIT_PROFILE_TYPES;
    /** Possible errors */
    errors = {
        valueRequired: false,
        valueFormat: false
    };
    form: FormGroup;
    waiting: boolean = false;


    constructor(private contractsGateService: ContractsGateService, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.commissionProfile = this.contractManagementService.gateCommissionProfile;
        this.products = this.contractManagementService.products;
        if (this.commissionProfile && this.products && this.products.length) {
            this.createForm();
        } else {
            this.router.navigate(['../../'], {relativeTo: this.route});
        }
    }

    createForm() {
        this.form = this.fb.group({
            productId: [this.products[0].id],
            qualifier: ['amount'],
            timeUnit: [this.timeUnitKeys()[0]],
            value: ['', [Validators.required]]
        });

        this.form.controls.timeUnit.valueChanges.subscribe(data => {
            if (data === 'per_transaction') {
                this.form.controls.qualifier.setValue('amount');
            }
        });
    }

    /**
     * Makes a request to create new limit profile
     */
    onAdd() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.contractsGateService.createLimitProfile(this.contractManagementService.contractId, this.commissionProfile.id, {
                productId: this.form.controls.productId.value,
                txType: null,
                qualifier: this.form.controls.qualifier.value,
                timeUnit: this.form.controls.timeUnit.value,
                value: this.form.controls.value.value,
                active: true
            }).then(data => {
                this.waiting = false;
                this.router.navigate(['../../'], {relativeTo: this.route});
            }).catch(() => this.waiting = false);
        }
    }

    /**
     * Checks errors in form
     * @returns {boolean} - True if there are no errors
     */
    checkErrors(): boolean {
        if (this.form.controls.value.hasError('required')) {
            this.errors.valueRequired = true;
        } else {
            if (this.form.controls.qualifier.value === 'amount'
                && !(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/).test(this.form.controls.value.value)
                || this.form.controls.qualifier.value === 'quantity'
                && !(/^[1-9][0-9]*$/).test(this.form.controls.value.value)) {
                this.errors.valueFormat = true;
            }
        }
        return !Object.keys(this.errors).find(key => this.errors[key]);
    }

    /**
     * Returns list of time units keys
     * @returns {string[]}
     */
    timeUnitKeys() {
        return Object.keys(this.timeUnits);
    }

    /**
     * Resets specified errors
     * @param {string} errors
     */
    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    ngOnDestroy() {
        this.contractManagementService.gateCommissionProfile = null;
        this.contractManagementService.product = null;
    }

}
