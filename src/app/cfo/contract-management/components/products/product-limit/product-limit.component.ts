import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {GateLimitProfile} from '../../../../../_interfaces/gate-limit-profile';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {ContractManagementService} from '../../../services/contract-management.service';
import {LIMIT_PROFILE_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-product-limit',
    templateUrl: './product-limit.component.html',
    styleUrls: ['./product-limit.component.less']
})
export class ProductLimitComponent implements OnInit {

    @Input() commissionProfile: GateCommissionProfile;
    limitProfiles: GateLimitProfile[];
    limitTypes = LIMIT_PROFILE_TYPES;

    constructor(private contractsGateService: ContractsGateService, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getLimitProfiles();
    }

    getLimitProfiles() {
        this.contractsGateService.getLimitProfilesOfGateCommissionProfile(
            this.contractManagementService.contractId,
            this.commissionProfile.id
        ).then(data => {
            this.limitProfiles = data.records;
        }).catch();
    }

    onAdd() {
        this.contractManagementService.products = [];
        this.contractManagementService.gateCommissionProfile = this.commissionProfile;
        this.router.navigate([this.commissionProfile.id, 'add-limit'], {relativeTo: this.route});
    }

    onEdit(profile: GateLimitProfile) {
        this.contractManagementService.gateCommissionProfile = this.commissionProfile;
        this.contractManagementService.gateLimitProfile = profile;
        this.router.navigate([this.commissionProfile.id, 'edit-limit', profile.id], {relativeTo: this.route});
    }

}
