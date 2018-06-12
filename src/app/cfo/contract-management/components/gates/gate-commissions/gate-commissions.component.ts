import {Component, Input, OnInit} from '@angular/core';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {GateCommissionProfileSettings} from '../../../../../_interfaces/gate-commission-profile-settings';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {ProviderAccount} from '../../../../../_interfaces/provider-account';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMISSION_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-gate-commissions',
    templateUrl: './gate-commissions.component.html',
    styleUrls: ['./gate-commissions.component.less']
})
export class GateCommissionsComponent implements OnInit {

    /** Gate commission profile */
    @Input() commissionProfile: GateCommissionProfile;
    /** Parent gate provider */
    @Input() gateProvider: ProviderAccount;
    /** List of settings of gate commission profile */
    commissionSettings: GateCommissionProfileSettings[];
    /** Commission profile settings, sorted by transaction type and collector (provider, total) */
    commissions: {
        [type: string]: {
            [collector: string]: GateCommissionProfileSettings
        }
    };

    commissionTypes = COMMISSION_TYPES;

    constructor(private contractsGateService: ContractsGateService, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getCommissionSettings();
    }

    /**
     * Makes a request to get settings of gate commission profile
     */
    getCommissionSettings() {
        this.contractsGateService
            .getGateCommissionProfileSettings(this.contractManagementService.contractId, this.commissionProfile.id)
            .then(data => {
                this.commissionSettings = data.records;
                this.commissions = {};
                this.commissionSettings.forEach(item => {
                    this.commissions[item.txType] = this.commissions[item.txType] || {};
                    this.commissions[item.txType][item.collector] = item;
                });
            })
            .catch();
    }

    /**
     * Returns list of txTypes of commission profile
     * @returns {string[]}
     */
    getCommissionsTypes(): string[] {
        return Object.keys(this.commissions);
    }

    /**
     * Returns true if there is no gate commission profile settings for transaction type with supported by gate provider
     * @returns {boolean}
     */
    canAddOperation(): boolean {
        return this.gateProvider.supportedTransactionTypes.some(type => !this.commissions[type]);
    }

    /**
     * Navigates to commission profile settings editing page and saves editing profile settings to service
     * @param commission - commission txType
     */
    onEdit(commission) {
        this.contractManagementService.gateCommissionProfileSettings = this.commissions[commission];
        this.router.navigate([this.commissionProfile.id, 'edit'], {relativeTo: this.route});
    }

    onAdd() {
        this.contractManagementService.allowedTxTypes = this.gateProvider.supportedTransactionTypes.filter(type => !this.commissions[type]);
        this.router.navigate([this.commissionProfile.id, 'add'], {relativeTo: this.route});
    }
}
