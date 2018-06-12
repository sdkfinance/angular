import {Component, Input, OnInit} from '@angular/core';
import {LoyaltyRule} from "../../../../_classes/loyalty-rule";

@Component({
    selector: 'app-dashboard-promotions-item',
    templateUrl: './dashboard-promotions-item.component.html',
    styles: []
})
export class DashboardPromotionsItemComponent implements OnInit {

    @Input() promotion: LoyaltyRule;

    constructor() {
    }

    ngOnInit() {
    }

}
