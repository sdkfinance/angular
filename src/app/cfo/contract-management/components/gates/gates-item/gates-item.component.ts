import {Component, Input, OnInit} from '@angular/core';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {ProviderAccount} from '../../../../../_interfaces/provider-account';
import {IssuersService} from '../../../../../_services/issuers.service';
import {Currency} from '../../../../../_interfaces/currency';

@Component({
    selector: 'app-gates-item',
    templateUrl: './gates-item.component.html',
    styleUrls: ['./gates-item.component.less']
})
export class GatesItemComponent implements OnInit {

    /** Gate provider account */
    @Input() gateProvider: ProviderAccount;
    /** List of commission profiles of this gate provider */
    @Input() gateCommissionProfiles: GateCommissionProfile[];
    /** System currencies */
    @Input() currencies: Currency[];
    /** If provider allows to add one more commission profile, it can have only one commission profile for every currency */
    canAddCommission: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.canAddCommission = this.checkCurrencies();
    }

    /**
     * Returns true if there is at least one currency for which there is no gate commission profile
     * @returns {boolean}
     */
    checkCurrencies() {
        return !this.gateCommissionProfiles.length ||
            this.currencies.some(item => this.gateCommissionProfiles
                .every(commission => commission.providerCurrency.code !== item.code));
    }

}
