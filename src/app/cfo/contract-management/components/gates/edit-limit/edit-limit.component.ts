import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractManagementService} from "../../../services/contract-management.service";
import {ContractsGateService} from "../../../../../_services/contracts-gate.service";
import {GateLimitProfile} from "../../../../../_interfaces/gate-limit-profile";
import {GateCommissionProfile} from "../../../../../_interfaces/gate-commission-profile";

@Component({
    selector: 'app-edit-limit',
    templateUrl: './edit-limit.component.html',
    styles: []
})
export class EditLimitComponent implements OnInit, OnDestroy {

    commissionProfile: GateCommissionProfile;
    limitProfile: GateLimitProfile;

    form: FormGroup;
    waiting: boolean = false;
    /** Possible errors */
    errors = {
        valueRequired: false,
        valueFormat: false
    };

    constructor(private fb: FormBuilder, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute, private contractsGateService: ContractsGateService) {
    }

    ngOnInit() {
        this.limitProfile = this.contractManagementService.gateLimitProfile;
        this.commissionProfile = this.contractManagementService.gateCommissionProfile;

        if (this.limitProfile && this.commissionProfile) {
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
            value: [this.limitProfile.value, [Validators.required]]
        });

    }

    /**
     * Makes a request to update limit profile
     */
    onSave() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.contractsGateService.updateLimitProfile(
                this.contractManagementService.contractId,
                this.commissionProfile.id,
                this.limitProfile.id,
                {
                    value: this.form.controls.value.value,
                    active: this.limitProfile.active
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
            if (this.limitProfile.qualifier === 'amount'
                && !(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/).test(this.form.controls.value.value)
                || this.limitProfile.qualifier === 'quantity'
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
        this.contractManagementService.gateCommissionProfile = null;
        this.contractManagementService.gateLimitProfile = null;
    }

}
