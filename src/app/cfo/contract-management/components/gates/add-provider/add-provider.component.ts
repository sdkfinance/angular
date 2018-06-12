import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractsGateService} from '../../../../../_services/contracts-gate.service';
import {GateCommissionProfile} from '../../../../../_interfaces/gate-commission-profile';
import {ContractManagementService} from '../../../services/contract-management.service';
import {IssuersService} from '../../../../../_services/issuers.service';
import {Currency} from '../../../../../_interfaces/currency';

@Component({
    selector: 'app-add-provider',
    templateUrl: './add-provider.component.html',
    styles: []
})
export class AddProviderComponent implements OnInit {

    providerId: string;
    commissions: GateCommissionProfile[];
    currencies: Currency[];
    selectedCurrency;
    waiting: boolean;

    constructor(private route: ActivatedRoute, private contractGateService: ContractsGateService, private router: Router,
                private contractManagementService: ContractManagementService, private issuersService: IssuersService) {
    }

    ngOnInit() {
        this.providerId = this.route.snapshot.params['providerId'];
        this.getCurrencies();
    }

    getCurrencies() {
        Promise.all([
            this.contractGateService.getGateCommissionProfiles(this.contractManagementService.contractId),
            this.issuersService.getCurrencies()
        ]).then(data => {
            this.commissions = <GateCommissionProfile[]>data[0].records
                .filter(profile => profile.providerAccountId === this.providerId);

            this.currencies = (<Currency[]>data[1].currencies).filter(currency => {
                return this.commissions.every(commission => commission.providerCurrency.code !== currency.code);
            });
            if (!this.currencies || !this.currencies.length) {
                this.router.navigate(['../../'], {relativeTo: this.route});
            } else {
                this.selectedCurrency = this.currencies[0].code;
            }
        }).catch();
    }

    onAdd() {
        this.waiting = true;
        this.contractGateService.createGateCommissionProfiles(this.contractManagementService.contractId, {
            providerAccountId: this.providerId,
            currencyCode: this.selectedCurrency
        }).then(() => {
            this.waiting = false;
            this.router.navigate(['../../'], {relativeTo: this.route});
        }).catch(() => this.waiting = false);
    }

}
