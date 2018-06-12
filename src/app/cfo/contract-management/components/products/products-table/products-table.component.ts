import {Component, OnInit} from '@angular/core';
import {IssuersService} from '../../../../../_services/issuers.service';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {ProviderAccount} from '../../../../../_interfaces/provider-account';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {Currency} from '../../../../../_interfaces/currency';
import {GateProvidersService} from '../../../../../_services/gate-providers.service';
import {ContractManagementService} from '../../../services/contract-management.service';

@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.less']
})
export class ProductsTableComponent implements OnInit {

    /** List of gate providers */
    gateProviders: ProviderAccount[];
    /** List of all gate commission profiles */
    gateCommissionProfiles: GateCommissionProfile[];
    /** System currencies */
    currencies: Currency[];

    constructor(private contractGateService: ContractsGateService, private gateProvidersService: GateProvidersService,
                private contractManagementService: ContractManagementService, private issuersService: IssuersService) {
    }

    ngOnInit() {
        this.getProviders();
        this.getProfiles();
        this.getCurrencies();
    }

    /**
     * Gets gate providers
     */
    getProviders() {
        this.gateProvidersService.getProviders().then(data => {
            this.gateProviders = (<ProviderAccount[]>data.records).filter(p => {
                return p.supportedTransactionTypes.indexOf('PURCHASE') >= 0;
            });
        }).catch();
    }

    /**
     * Gets gate commission profiles
     */
    getProfiles() {
        this.contractGateService.getGateCommissionProfiles(this.contractManagementService.contractId).then(data => {
            this.gateCommissionProfiles = data.records;
        }).catch();
    }

    /**
     * Select gate commission profiles for provider
     * @param {ProviderAccount} provider
     * @returns {GateCommissionProfile[]} - list of gate commission profiles
     */
    getCommissionProfilesForProvider(provider: ProviderAccount): GateCommissionProfile[] {
        return this.gateCommissionProfiles.filter(profile => profile.providerAccountId === provider.id);
    }

    /**
     * Gets system currencies
     */
    getCurrencies() {
        this.issuersService.getCurrencies().then(data => {
            this.currencies = data.currencies;
        }).catch();
    }

}
