import {Component, OnInit} from '@angular/core';
import {LoyaltyRule} from '../../../../_classes/loyalty-rule';
import {LoyaltyRulesService} from '../../../../_services/loyalty-rules.service';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-loyalty-rules',
    templateUrl: './loyalty-rules.component.html',
    styles: []
})
export class LoyaltyRulesComponent implements OnInit {
    loyaltyRules: LoyaltyRule[] = null;

    constructor(private loyaltyRulesService: LoyaltyRulesService, private title: Title) {
        this.title.setTitle(PAGE_TITLES.promotions);
        TitleService.setTitle(WINDOW_TITLE.promotions);
    }

    ngOnInit() {
        this.getLoyaltyRulesFromHttp();
    }

    getLoyaltyRulesFromHttp() {
        this.loyaltyRulesService.getLoyaltyRulesList().then(response => this.loyaltyRules = response);
    }

    updateRules(event) {
        this.getLoyaltyRulesFromHttp();
    }

}
