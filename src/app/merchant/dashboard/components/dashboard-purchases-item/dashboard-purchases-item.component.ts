import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../../_classes/transaction";

@Component({
    selector: 'app-dashboard-purchases-item',
    templateUrl: './dashboard-purchases-item.component.html',
    styleUrls: ['../dashboard-purchases/dashboard-purchases.component.less']
})
export class DashboardPurchasesItemComponent implements OnInit {

    @Input() purchase: Transaction;

    isCheckShown = false;

    constructor() {
    }

    ngOnInit() {
    }

    onToggle() {
        this.isCheckShown = !this.isCheckShown;
    }

}
