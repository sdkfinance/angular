import {Component, Input, OnInit} from '@angular/core';
import {ProviderAccount} from "../../../../../_interfaces/provider-account";
import {GateCommissionProfile} from "../../../../../_interfaces/gate-commission-profile";
import {Currency} from "../../../../../_interfaces/currency";

@Component({
    selector: 'app-products-item',
    templateUrl: './products-item.component.html',
    styleUrls: ['./products-item.component.less']
})
export class ProductsItemComponent implements OnInit {

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
