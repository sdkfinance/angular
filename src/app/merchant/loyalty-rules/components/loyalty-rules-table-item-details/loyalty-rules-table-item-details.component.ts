import {Component, Input, OnInit} from '@angular/core';
import {LoyaltyRule} from "../../../../_classes/loyalty-rule";
import {Pos} from "../../../../_classes/pos";
import {LoyaltyRulesService} from "../../../../_services/loyalty-rules.service";
import {LoyaltyGroup} from "../../../../_classes/loyalty-group";

@Component({
    selector: 'app-loyalty-rules-table-item-details',
    templateUrl: './loyalty-rules-table-item-details.component.html',
    styles: []
})
export class LoyaltyRulesTableItemDetailsComponent implements OnInit {
    @Input() loyaltyRule: LoyaltyRule;

    posList: Pos[] = null;
    productsList: any[]= null;
    categoriesList: any[] = null;
    loyaltyGroupsList: LoyaltyGroup[] = null;
    issuersList: any[] = null;

    constructor(private loyaltyRulesService: LoyaltyRulesService) {
    }

    ngOnInit() {
        this.getPosList();
        this.getLoyaltyGroupsList();
        this.getProductsList();
        this.getCategoriesList();
        this.getIssuers();

    }

    getPosList() {
        this.loyaltyRulesService.getPointsOfSaleUsedByLoyaltyRule(this.loyaltyRule.id)
            .then(res => this.posList = res.records)
            .catch(error => console.log(error));
    }

    getProductsList() {
        this.loyaltyRulesService.getProductsUsedByLoyaltyRule(this.loyaltyRule.id)
            .then(res => this.productsList = res.products)
            .catch(error => console.log(error));
    }

    getCategoriesList() {
        this.loyaltyRulesService.getCategoriesUsedByLoyaltyRule(this.loyaltyRule.id)
            .then(res => this.categoriesList = res.categories)
            .catch(error => console.log(error));
    }

    getIssuers() {
        this.loyaltyRulesService.getIssuersUsedByLoyaltyRule(this.loyaltyRule.id)
            .then(res => this.issuersList = res.records)
            .catch(error => console.log(error));
    }

    getLoyaltyGroupsList() {
        this.loyaltyRulesService.getLoyaltyGroupsUsedByLoyaltyRule(this.loyaltyRule.id)
            .then(res => this.loyaltyGroupsList = res.records)
            .catch(error => console.log(error));
    }

}
