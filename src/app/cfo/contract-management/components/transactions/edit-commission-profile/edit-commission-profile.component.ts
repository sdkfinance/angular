import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommissionProfile} from '../../../../../_interfaces/commission-profile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ContractsService} from '../../../../../_services/contracts.service';
import {COMMISSION_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-edit-commission-profile',
    templateUrl: './edit-commission-profile.component.html',
    styles: []
})
export class EditCommissionProfileComponent implements OnInit, OnDestroy {

    /** Commission profile for editing */
    profile: CommissionProfile;
    /** Contract id */
    contractId: string;

    form: FormGroup;
    waiting: boolean = false;
    /** Possible errors */
    errors = {
        valuePercentRequired: false,
        valuePercentFormat: false,
        valueFixedRequired: false,
        valueFixedFormat: false
    };

    commissionTypes = COMMISSION_TYPES;

    constructor(private fb: FormBuilder, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute, private contractsService: ContractsService) {
    }

    ngOnInit() {
        const profileId = this.route.snapshot.params.profileId;
        this.contractId = this.contractManagementService.contractId;
        if (this.contractManagementService.commissionProfile
            && profileId === this.contractManagementService.commissionProfile.id) {
            this.profile = this.contractManagementService.commissionProfile;
            this.createForm();
        } else {
            this.router.navigate(['../../'], {relativeTo: this.route});
        }
    }

    createForm() {
        this.form = this.fb.group({
            type: [this.profile.value.type],
            valuePercent: [this.profile.value.valuePercent * 100, [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]],
            valueFixed: [this.profile.value.valueFixed, [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]],
            direction: [this.profile.direction]
        });
    }

    /**
     * Makes a request to update commission profile
     */
    onSave() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.contractsService.updateCommissionProfile(this.contractId, this.profile.id, {
                direction: this.form.controls.direction.value,
                value: {
                    type: this.form.controls.type.value,
                    valuePercent:
                        this.commissionTypes[this.form.controls.type.value].percent ? this.form.controls.valuePercent.value / 100 : null,
                    valueFixed:
                        this.commissionTypes[this.form.controls.type.value].fixed ? this.form.controls.valueFixed.value : null
                },
                active: this.profile.active
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
    checkErrors() {
        if (this.commissionTypes[this.form.controls.type.value].percent) {
            if (this.form.controls.valuePercent.hasError('pattern')) {
                this.errors.valuePercentFormat = true;
            }
            if (this.form.controls.valuePercent.hasError('required')) {
                this.errors.valuePercentRequired = true;
            }
        }
        if (this.commissionTypes[this.form.controls.type.value].fixed) {
            if (this.form.controls.valueFixed.hasError('pattern')) {
                this.errors.valueFixedFormat = true;
            }
            if (this.form.controls.valueFixed.hasError('required')) {
                this.errors.valueFixedRequired = true;
            }
        }
        return Object.keys(this.errors).every(key => !this.errors[key]);
    }

    /**
     * Resets specified errors
     * @param {string} errors
     */
    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    commissionTypesKeys(): string[] {
        return Object.keys(this.commissionTypes);
    }

    ngOnDestroy() {
        this.contractManagementService.commissionProfile = null;
    }
}
