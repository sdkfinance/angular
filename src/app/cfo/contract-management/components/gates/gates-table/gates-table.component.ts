import {Component, OnInit} from '@angular/core';
import {ProviderAccount} from '../../../../../_interfaces/provider-account';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {GateProvidersService} from '../../../../../_services/gate-providers.service';
import {ContractManagementService} from '../../../services/contract-management.service';
import {IssuersService} from '../../../../../_services/issuers.service';
import {Currency} from '../../../../../_interfaces/currency';

@Component({
    selector: 'app-gates-table',
    templateUrl: './gates-table.component.html',
    styleUrls: ['./gates-table.component.less']
})
export class GatesTableComponent implements OnInit {

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
                return p.supportedTransactionTypes.indexOf('TOPUP') >= 0 || p.supportedTransactionTypes.indexOf('REDEEM') >= 0;
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
