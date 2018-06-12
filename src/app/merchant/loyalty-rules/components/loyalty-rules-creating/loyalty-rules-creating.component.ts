import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LoyaltyGroup} from '../../../../_classes/loyalty-group';
import {LoyaltyRule} from '../../../../_classes/loyalty-rule';
import {Product} from '../../../../_classes/product';
import {LoyaltyRulesService} from '../../../../_services/loyalty-rules.service';
import {ProductCategory} from '../../../../_classes/product-category';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';

@Component({
    selector: 'app-loyalty-rules-creating',
    templateUrl: './loyalty-rules-creating.component.html',
    styles: []
})
export class LoyaltyRulesCreatingComponent implements OnInit {
    @Input() loyaltyRules: LoyaltyRule[] = null;

    @ViewChild('selectCategories') selectCategories;
    @ViewChild('selectLoyaltyGroups') selectLoyaltyGroups;
    @ViewChild('selectProducts') selectProducts;
    @ViewChild('selectLoyaltyRule') selectLoyaltyRule;
    @ViewChild('selectIssuer') selectIssuer;

    loyaltyRule: LoyaltyRule = null;
    loyaltyGroups: LoyaltyGroup[] = null;
    products = null;
    productCategories = null;
    issuer = null;
    pointsOfSale = null;

    constructor(private loyaltyRulesService: LoyaltyRulesService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
    }

    updateLoyaltyRule(loyaltyRule: LoyaltyRule) {
        this.loyaltyRule = loyaltyRule;
    }

    updateIssuer(issuer) {
        this.issuer = issuer;
    }

    updatePointsOfSales(pointsOfSale) {
        this.pointsOfSale = pointsOfSale;
    }

    updateLoyaltyGroup(loyaltyGroups) {
        this.loyaltyGroups = loyaltyGroups;
    }

    updateProducts(products) {
        this.products = products;
    }

    updateProductCategories(productCategories) {
        this.productCategories = productCategories;
    }

    onCreate() {
        // console.log(this.loyaltyRule);
        //
        // if (this.pointsOfSale) {
        //     for (let pos of this.pointsOfSale) {
        //         if (pos.selected) console.log(pos.pos);
        //     }
        // }
        //
        // for (let lg of this.loyaltyGroups) {
        //     console.log(lg);
        // }
        //
        // for (let product of this.products) {
        //     console.log(product);
        // }
        //
        // for (let category of this.productCategories) {
        //     console.log(category);
        // }
        //
        // console.log(this.issuer);

        if (this.loyaltyRule) {
            this.createSpecialOffer();
        }
    }

    createSpecialOffer() {

        if (this.pointsOfSale) {
            for (let pos of this.pointsOfSale) {
                if (pos.selected) this.addPointOfSaleToTheLoyaltyRule(pos.pos);
            }
        }

        for (let lg of this.loyaltyGroups) {
            if (lg) this.addLoyaltyGroupToTheLoyaltyRule(lg);
        }

        if (this.loyaltyRule.valueType == 'NOT_SPECIFIED') {
            for (let product of this.products) {
                if (product.product) this.addProductToTheLoyaltyRule(product.product, product.valueType.value, product.value);
            }

            for (let category of this.productCategories) {
                if (category.category) this.addProductCategoryToTheLoyaltyRule(category.category, category.valueType.value, category.value);
            }
        }

        this.addIssuerToTheLoyaltyRule();
    }

    addIssuerToTheLoyaltyRule() {
        this.loyaltyRulesService.addIssuerToTheLoyaltyRule(this.loyaltyRule.id, this.issuer.id)
            .then(response => {
                this.openSnackBarComponent();
                this.clearFields();
            })
            .catch(error => console.log(error));
    }

    addLoyaltyGroupToTheLoyaltyRule(loyaltyGroup: LoyaltyGroup) {
        this.loyaltyRulesService.addLoyaltyGroupToTheLoyaltyRule(this.loyaltyRule.id, loyaltyGroup.id)
            .then()
            .catch(error => console.log(error));
    }

    addProductCategoryToTheLoyaltyRule(category: ProductCategory, valueType: string, value: any) {
        let body = {
            valueType: valueType,
            value: this.getValue(valueType, value)
        };

        this.loyaltyRulesService.addProductCategoryToTheLoyaltyRule(this.loyaltyRule.id, category.id, body)
            .then()
            .catch(error => console.log(error));
    }

    addProductToTheLoyaltyRule(product: Product, valueType: string, value: any) {
        let body = {
            valueType: valueType,
            value: this.getValue(valueType, value)
        };

        this.loyaltyRulesService.addProductToTheLoyaltyRule(this.loyaltyRule.id, product.id, body)
            .then()
            .catch(error => console.log(error));
    }

    addPointOfSaleToTheLoyaltyRule(pos) {
        this.loyaltyRulesService.addPointOfSaleToTheLoyaltyRule(this.loyaltyRule.id, pos.id)
            .then()
            .catch(error => console.log(error));
    }

    /**
     * returns value of discount according to the value type
     * @param valueType
     * @param value
     * @returns {any}
     */
    getValue(valueType: string, value: any) {
        if (valueType == 'PERCENT')
            return value / 100;
        else if (valueType == 'FIXED')
            return value;
        else return '';
    };

    clearFields() {
        this.loyaltyRule = null;
        this.pointsOfSale = null;
        if (this.selectCategories) this.selectCategories.clearSelectedCategories();
        if (this.selectProducts) this.selectProducts.clearSelectedProducts();
        if (this.selectLoyaltyGroups) this.selectLoyaltyGroups.clearSelectedLoyaltyGroups();
        if (this.selectLoyaltyRule) this.selectLoyaltyRule.clearSelectedLoyaltyRule();
        this.selectIssuer.clearSelectedIssuer();
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Promotion created!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }

}
