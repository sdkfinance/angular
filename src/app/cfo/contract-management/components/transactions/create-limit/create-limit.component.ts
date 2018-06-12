import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommissionProfile} from '../../../../../_interfaces/commission-profile';
import {LIMIT_PROFILE_TYPES} from '../../../../../app.constants';
import {ContractsService} from '../../../../../_services/contracts.service';

@Component({
    selector: 'app-create-limit',
    templateUrl: './create-limit.component.html',
    styles: []
})
export class CreateLimitComponent implements OnInit, OnDestroy {
    /** Contract id */
    contractId;
    /** Commission profile id */
    profileId;
    /** Commission profile */
    profile: CommissionProfile;
    /** Time unit types */
    timeUnits = LIMIT_PROFILE_TYPES;
    /** Possible errors */
    errors = {
        valueRequired: false,
        valueFormat: false
    };
    form: FormGroup;
    waiting: boolean = false;

    constructor(private fb: FormBuilder, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute, private contractsService: ContractsService) {
    }

    ngOnInit() {
        this.profileId = this.route.snapshot.params.profileId;
        this.contractId = this.route.snapshot.params.id;
        if (this.contractManagementService.commissionProfile
            && this.profileId === this.contractManagementService.commissionProfile.id) {
            this.profile = this.contractManagementService.commissionProfile;
            this.createForm();
        } else {
            this.router.navigate(['../../../'], {relativeTo: this.route});
        }
    }

    /**
     * Creates form
     */
    createForm() {
        this.form = this.fb.group({
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
     * Returns list of time units keys
     * @returns {string[]}
     */
    timeUnitKeys() {
        return Object.keys(this.timeUnits);
    }

    /**
     * Makes a request to create new limit profile
     */
    onAdd() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.contractsService.createLimitProfile(this.contractId, this.profileId, {
                qualifier: this.form.controls.qualifier.value,
                timeUnit: this.form.controls.timeUnit.value,
                value: this.form.controls.value.value,
                active: true
            }).then(data => {
                this.waiting = false;
                this.router.navigate(['../../../'], {relativeTo: this.route});
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
     * Resets specified errors
     * @param {string} errors
     */
    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    ngOnDestroy() {
        this.contractManagementService.commissionProfile = null;
    }
}
