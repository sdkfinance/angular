import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommissionProfile} from '../../../../../_interfaces/commission-profile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContractsService} from '../../../../../_services/contracts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractManagementService} from '../../../services/contract-management.service';
import {LimitProfile} from '../../../../../_interfaces/limit-profile';

@Component({
    selector: 'app-edit-limit-profile',
    templateUrl: './edit-limit-profile.component.html',
    styles: []
})
export class EditLimitProfileComponent implements OnInit, OnDestroy {
    /** Contract id */
    contractId;
    /** Commission profile id */
    profileId;
    /** Limit profile id */
    limitId;
    /** Commission profile */
    profile: CommissionProfile;
    /** Limit profile for editing */
    limit: LimitProfile;

    form: FormGroup;
    waiting: boolean = false;
    /** Possible errors */
    errors = {
        valueRequired: false,
        valueFormat: false
    };

    constructor(private fb: FormBuilder, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute, private contractsService: ContractsService) {
    }

    ngOnInit() {
        this.profileId = this.route.snapshot.params.profileId;
        this.contractId = this.route.snapshot.params.id;
        this.limitId = this.route.snapshot.params.limitId;
        if (this.contractManagementService.commissionProfile
            && this.profileId === this.contractManagementService.commissionProfile.id
            && this.contractManagementService.limitProfile
            && this.limitId === this.contractManagementService.limitProfile.id) {
            this.profile = this.contractManagementService.commissionProfile;
            this.limit = this.contractManagementService.limitProfile;
            this.createForm();
        } else {
            this.router.navigate(['../../../../'], {relativeTo: this.route});
        }
    }
    /**
     * Creates form
     */
    createForm() {
        this.form = this.fb.group({
            value: [this.limit.value, [Validators.required]]
        });

    }
    /**
     * Makes a request to update limit profile
     */
    onSave() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.contractsService.updateLimitProfile(this.contractId, this.profileId, this.limitId, {
                value: this.form.controls.value.value,
                active: this.limit.active
            }).then(data => {
                this.waiting = false;
                this.router.navigate(['../../../../'], {relativeTo: this.route});
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
            if (this.limit.qualifier === 'amount'
                && !(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/).test(this.form.controls.value.value)
                || this.limit.qualifier === 'quantity'
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
