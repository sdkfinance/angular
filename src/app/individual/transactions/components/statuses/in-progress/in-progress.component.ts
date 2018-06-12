import {Component, OnInit} from '@angular/core';
import {GateTransactionState} from '../../../../../_interfaces/gate-transaction-state';
import {GatesService} from '../../../../../_services/gates.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-in-progress',
    templateUrl: './in-progress.component.html',
    styleUrls: ['./in-progress.component.less']
})
export class InProgressComponent implements OnInit {

    /** Gate transaction */
    transaction: GateTransactionState;

    constructor(private gatesService: GatesService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.getTransaction();
    }

    /**
     * Makes a request to get transaction state
     */
    getTransaction() {
        const tx = this.route.snapshot.params['tx'];
        this.gatesService.getTransaction(tx).then(data => {
            this.transaction = data.transaction;
        }).catch(() => {
            this.router.navigate(['../../../../wallets'], {relativeTo: this.route});
        });
    }

}
