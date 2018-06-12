import {Component, Input, OnInit} from '@angular/core';
import {CommissionProfile} from '../../../../../_interfaces/commission-profile';
import {ContractsService} from '../../../../../_services/contracts.service';
import {LimitProfile} from '../../../../../_interfaces/limit-profile';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractManagementService} from '../../../services/contract-management.service';
import {COMMISSION_TYPES, LIMIT_PROFILE_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-transactions-item',
    templateUrl: './transactions-item.component.html',
    styleUrls: ['./transactions-item.component.less']
})
export class TransactionsItemComponent implements OnInit {

    /** One commission profile */
    @Input() profile: CommissionProfile;
    /** Id of contract of this commission profile */
    @Input() contractId: string;
    /** List of the limit profiles of this commission profile */
    limitProfiles: LimitProfile[];

    constructor(private contractsService: ContractsService,
                private router: Router,
                private route: ActivatedRoute,
                private contractManagementService: ContractManagementService) {
    }

    commissionTypes = COMMISSION_TYPES;
    limitTypes = LIMIT_PROFILE_TYPES;

    ngOnInit() {
        this.getLimitProfiles();
    }

    /**
     * Makes a request to get limit profiles
     */
    getLimitProfiles() {
        this.contractsService.getLimitProfilesForCommissionProfile(this.contractId, this.profile.id).then(data => {
            this.limitProfiles = data.records;
        }).catch();
    }

    /**
     * Opens adding limit profile window
     * @param {string} profileId - Commission profile id
     */
    onAddLimit(profileId: string) {
        this.contractManagementService.commissionProfile = this.profile;
        this.router.navigate([`./${profileId}/limit/add`], {relativeTo: this.route});
    }

    /**
     * Opens editing limit profile window
     * @param {string} profileId - Commission profile id
     * @param {LimitProfile} limit - Limit profile to edit
     */
    onEditLimit(profileId: string, limit: LimitProfile) {
        this.contractManagementService.commissionProfile = this.profile;
        this.contractManagementService.limitProfile = limit;
        this.router.navigate([`./${profileId}/limit/edit/${limit.id}`], {relativeTo: this.route});
    }

    /**
     * Opens editing commission profile window
     * @param {string} profileId - Id of commission profile to edit
     */
    onEditCommission(profileId: string) {
        this.contractManagementService.commissionProfile = this.profile;
        this.router.navigate([`./${profileId}/edit`], {relativeTo: this.route});
    }

}
