import {Component, Input, OnInit} from '@angular/core';
import {GateTransactionState} from '../../../../_interfaces/gate-transaction-state';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-transaction-state',
    templateUrl: './transaction-state.component.html',
    styleUrls: ['./transaction-state.component.less']
})
export class TransactionStateComponent implements OnInit {

    @Input() transaction: GateTransactionState;

    role: string;

    constructor(private authService: AuthorizationService) {
    }

    ngOnInit() {
        this.role = this.authService.userProfile.roles[0];
    }

}
