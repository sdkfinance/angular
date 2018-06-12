import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {ProviderAccount} from '../../../../../_interfaces/provider-account';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ProductCommissionProfileSettings} from '../../../../../_interfaces/product-commission-profile-settings';
import {COMMISSION_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-product-commissions',
    templateUrl: './product-commissions.component.html',
    styleUrls: ['product-commissions.component.less']
})
export class ProductCommissionsComponent implements OnInit {

    /** Gate commission profile */
    @Input() commissionProfile: GateCommissionProfile;
    /** Parent gate provider */
    @Input() gateProvider: ProviderAccount;
    /** List of settings of gate commission profile */
    productCommissionSettings: ProductCommissionProfileSettings[];
    /** Commission profile settings, sorted by product id and collector (provider, total) */
    commissions: {
        [productId: string]: {
            [collector: string]: ProductCommissionProfileSettings
        }
    };

    commissionTypes = COMMISSION_TYPES;

    constructor(private contractsGateService: ContractsGateService, private contractManagementService: ContractManagementService,
                private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getProductCommissionSettings();
    }

    /**
     * Makes a request to get settings of gate commission profile
     */
    getProductCommissionSettings() {
        this.contractsGateService
            .getProductCommissionSettings(this.contractManagementService.contractId, this.commissionProfile.id)
            .then(data => {
                this.productCommissionSettings = data.records;
                this.commissions = {};
                this.productCommissionSettings.forEach(item => {
                    this.commissions[item.product.id] = this.commissions[item.product.id] || {};
                    this.commissions[item.product.id][item.collector] = item;
                });
            })
            .catch();
    }

    /**
     * Returns list of product ids of product commission profile
     * @returns {string[]}
     */
    getProductIds(): string[] {
        return Object.keys(this.commissions);
    }

    /**
     * Returns true if there is no gate commission profile settings for transaction type with supported by gate provider
     * @returns {boolean}
     */
    canAddOperation(): boolean {
        return false; // this.gateProvider.supportedTransactionTypes.some(type => !this.commissions[type]);
    }

    /**
     * Navigates to commission profile settings editing page and saves editing profile settings to service
     * @param commission - commission txType
     */
    onEdit(commission) {
        this.contractManagementService.productCommissionProfileSettings = this.commissions[commission];
        this.router.navigate([this.commissionProfile.id, 'edit'], {relativeTo: this.route});
    }

    onAdd() {
        // this.contractManagementService.allowedTxTypes = this.gateProvider.supportedTransactionTypes.filter(type => !this.commissions[type]);
        this.router.navigate([this.commissionProfile.id, 'add'], {relativeTo: this.route});
    }
}
