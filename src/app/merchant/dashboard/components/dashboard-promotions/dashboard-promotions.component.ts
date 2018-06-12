import {Component, OnInit} from '@angular/core';
import {LoyaltyRulesService} from '../../../../_services/loyalty-rules.service';
import {LoyaltyRule} from '../../../../_classes/loyalty-rule';

@Component({
    selector: 'app-dashboard-promotions',
    templateUrl: './dashboard-promotions.component.html',
    styles: []
})
export class DashboardPromotionsComponent implements OnInit {

    loyaltyRules: LoyaltyRule[] = null;

    constructor(private loyaltyRulesService: LoyaltyRulesService) {
    }

    ngOnInit() {
        this.getLoyaltyRulesFromHttp();
    }

    getLoyaltyRulesFromHttp() {
        this.loyaltyRulesService.getLoyaltyRulesList().then(response => {
            this.loyaltyRules = [];
            if (response.length > 3) {
                this.loyaltyRules = response.slice(0, 3);
            } else {
                this.loyaltyRules = response;
            }
        });
    }

}
