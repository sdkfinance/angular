import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMISSION_TYPES} from '../../../../../app.constants';
import {ProductCommissionProfileSettings} from '../../../../../_interfaces/product-commission-profile-settings';

@Component({
    selector: 'app-edit-product-commission',
    templateUrl: './edit-product-commission.component.html',
    styleUrls: ['./edit-product-commission.component.less']
})
export class EditProductCommissionComponent implements OnInit, OnDestroy {

    @Input() isCreateMode: boolean = false;
    @Input() products: any[];
    /** Commission profile settings */
    commission: {
        [collector: string]: ProductCommissionProfileSettings
    };
    /** System commission types */
    commissionTypes = COMMISSION_TYPES;

    isProduct: boolean = false;

    errors = {
        provider: {
            valueFixedRequired: false,
            valueFixedFormat: false,
            valuePercentFormat: false,
            valuePercentRequired: false
        },
        total: {
            valueFixedRequired: false,
            valueFixedFormat: false,
            valuePercentFormat: false,
            valuePercentRequired: false
        }
    };

    waiting: boolean = false;
    form: FormGroup;

    constructor(private contractManagementService: ContractManagementService, private fb: FormBuilder,
                private router: Router, private route: ActivatedRoute, private gateContractsService: ContractsGateService) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data.type === 'product') {
                this.isProduct = true;
            }
        });

        this.commission = this.contractManagementService.productCommissionProfileSettings;
        this.products = this.contractManagementService.products;
        if (this.commission && !this.isCreateMode || this.isCreateMode && this.products && this.products.length) {
            this.createForm();
        } else {
            this.router.navigate(['../../'], {relativeTo: this.route});
        }
    }

    createForm() {
        this.form = this.isCreateMode ?
            this.fb.group({
                productId: this.products[0],
                provider: this.fb.group({
                    type: this.commissionTypesKeys()[0],
                    valuePercent: [
                        '',
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                    valueFixed: [
                        '',
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                }),
                total: this.fb.group({
                    type: this.commissionTypesKeys()[0],
                    valuePercent: [
                        '',
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                    valueFixed: [
                        '',
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                })
            }) :
            this.fb.group({
                provider: this.fb.group({
                    type: [this.commission['PROVIDER'].value.type],
                    valuePercent: [
                        this.commission['PROVIDER'].value.valuePercent * 100,
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                    valueFixed: [
                        this.commission['PROVIDER'].value.valueFixed,
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                }),
                total: this.fb.group({
                    type: [this.commission['TOTAL'].value.type],
                    valuePercent: [
                        this.commission['TOTAL'].value.valuePercent * 100,
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                    valueFixed: [
                        this.commission['TOTAL'].value.valueFixed,
                        [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]
                    ],
                })
            });

        this.form.get('provider.type').valueChanges.subscribe(data => {
            if (data === 'zero') {
                Object.keys(this.errors.provider).forEach(key => this.errors.provider[key] = false);
            }
        });

        this.form.get('total.type').valueChanges.subscribe(data => {
            if (data === 'zero') {
                Object.keys(this.errors.total).forEach(key => this.errors.total[key] = false);
            }
        });
    }

    onEdit() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.gateContractsService.setUpProductCommissionSettings(
                this.contractManagementService.contractId,
                this.route.snapshot.params.profileId,
                {
                    productId: this.isCreateMode ?
                        this.form.get('productId').value :
                        this.commission['PROVIDER'].product.id,
                    providerCommission: {
                        type: this.form.get('provider.type').value,
                        valuePercent:
                            this.commissionTypes[this.form.get('provider.type').value].percent ?
                                this.form.get('provider.valuePercent').value / 100 : null,
                        valueFixed:
                            this.commissionTypes[this.form.get('provider.type').value].fixed ?
                                this.form.get('provider.valueFixed').value : null
                    },
                    totalCommission: {
                        type: this.form.get('total.type').value,
                        valuePercent:
                            this.commissionTypes[this.form.get('total.type').value].percent ?
                                this.form.get('total.valuePercent').value / 100 : null,
                        valueFixed:
                            this.commissionTypes[this.form.get('total.type').value].fixed ?
                                this.form.get('total.valueFixed').value : null
                    },
                    active: this.isCreateMode ? true : this.commission['PROVIDER'].active
                }).then(data => {
                this.router.navigate(['../../'], {relativeTo: this.route});
                this.waiting = false;
            }).catch(() => this.waiting = false);
        }
    }

    /**
     * Returns keys of commission types
     * @returns {string[]}
     */
    commissionTypesKeys(): string[] {
        return Object.keys(this.commissionTypes);
    }

    /**
     * Checks errors and returns true if there are no errors
     * @returns {boolean}
     */
    checkErrors() {
        if (this.commissionTypes[this.form.get('provider.type').value].percent) {
            if (this.form.get('provider.valuePercent').hasError('pattern')) {
                this.errors.provider.valuePercentFormat = true;
            }
            if (this.form.get('provider.valuePercent').hasError('required')) {
                this.errors.provider.valuePercentRequired = true;
            }
        }
        if (this.commissionTypes[this.form.get('provider.type').value].fixed) {
            if (this.form.get('provider.valueFixed').hasError('pattern')) {
                this.errors.provider.valueFixedFormat = true;
            }
            if (this.form.get('provider.valueFixed').hasError('required')) {
                this.errors.provider.valueFixedRequired = true;
            }
        }

        if (this.commissionTypes[this.form.get('total.type').value].percent) {
            if (this.form.get('total.valuePercent').hasError('pattern')) {
                this.errors.total.valuePercentFormat = true;
            }
            if (this.form.get('total.valuePercent').hasError('required')) {
                this.errors.total.valuePercentRequired = true;
            }
        }
        if (this.commissionTypes[this.form.get('total.type').value].fixed) {
            if (this.form.get('total.valueFixed').hasError('pattern')) {
                this.errors.total.valueFixedFormat = true;
            }
            if (this.form.get('total.valueFixed').hasError('required')) {
                this.errors.total.valueFixedRequired = true;
            }
        }

        return Object.keys(this.errors)
            .every(key => Object.keys(this.errors[key]).every(error => !this.errors[key][error]));
    }

    /**
     * Resets specified errors
     * @param {string} collector
     * @param {string} errors
     */
    resetError(collector: string, ...errors: string[]) {
        errors.forEach(error => this.errors[collector][error] = false);
    }

    ngOnDestroy() {
        this.contractManagementService.productCommissionProfileSettings = null;
        this.contractManagementService.products = null;
    }

}
