import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoyaltyRule} from "../../../../_classes/loyalty-rule";

@Component({
    selector: 'app-loyalty-rules-creating-adding-rule',
    templateUrl: './loyalty-rules-creating-adding-rule.component.html',
    styles: []
})
export class LoyaltyRulesCreatingAddingRuleComponent implements OnInit {

    @Input() loyaltyRules: LoyaltyRule[] = null;

    @Output() selectedLoyaltyRuleUpdate: EventEmitter<LoyaltyRule> = new EventEmitter();

    loyaltyRulesTitle: string = "Loyalty rule";
    selectedLoyaltyRule: LoyaltyRule = null;

    constructor() {
    }

    ngOnInit() {
    }

    updateSelectedLoyaltyRule(loyaltyRule) {
        this.selectedLoyaltyRule = loyaltyRule;
        this.selectedLoyaltyRuleUpdate.emit(loyaltyRule);
    }

    clearSelectedLoyaltyRule() {
        this.selectedLoyaltyRule = null;
    }

}
