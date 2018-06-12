import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WithdrawalService} from '../../../../_services/withdrawal.service';
import {GatesService} from '../../../../_services/gates.service';

@Component({
    selector: 'app-withdrawal-services',
    templateUrl: './withdrawal-services.component.html',
    styleUrls: ['./withdrawal-services.component.less']
})
export class WithdrawalServicesComponent implements OnInit {

    /** Serial number of the coin where funds wil be withdraw from */
    serial;
    /** List of withdrawal providers */
    providers: any[];

    constructor(private route: ActivatedRoute, private gatesService: GatesService,
                private withdrawalService: WithdrawalService, private router: Router) {
    }

    /**
     * Gets withdrawal providers list
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.serial = params['serial'];
            if (this.withdrawalService.getCoins().find(coin => this.serial == coin.serial)) {
                this.gatesService.getProviders({
                    txType: 'REDEEM',
                    serial: this.serial
                })
                    .then(data => {
                        this.providers = data.records;
                    })
                    .catch(error => {

                    });
            } else {
                this.router.navigate(['../'], {relativeTo: this.route});
            }
        });
    }

}
