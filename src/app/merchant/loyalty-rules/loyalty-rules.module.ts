import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoyaltyRulesComponent} from './components/loyalty-rules/loyalty-rules.component';
import {LoyaltyRulesTableComponent} from './components/loyalty-rules-table/loyalty-rules-table.component';
import {LoyaltyRulesCreatingComponent} from './components/loyalty-rules-creating/loyalty-rules-creating.component';
import {RouterModule} from '@angular/router';
import {LOYALTY_RULES_ROUTES} from './loyalty-rules.routing';
import {LoyaltyRulesService} from '../../_services/loyalty-rules.service';
import {LoyaltyRulesTableItemComponent} from './components/loyalty-rules-table-item/loyalty-rules-table-item.component';
import {LoyaltyGroupsComponent} from './components/loyalty-groups/loyalty-groups.component';
import {LoyaltyGroupsTableComponent} from './components/loyalty-groups-table/loyalty-groups-table.component';
import {LoyaltyGroupsCreatingComponent} from './components/loyalty-groups-creating/loyalty-groups-creating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoyaltyGroupsTableItemComponent} from './components/loyalty-groups-table-item/loyalty-groups-table-item.component';
import {LoyaltyProductsComponent} from './components/loyalty-products/loyalty-products.component';
import {LoyaltyProductsCreatingComponent} from './components/loyalty-products-creating/loyalty-products-creating.component';
import {LoyaltyProductsTableComponent} from './components/loyalty-products-table/loyalty-products-table.component';
import {ProductsService} from '../../_services/products.service';
import {LoyaltyProductsMeasureUnitsListComponent} from './components/loyalty-products-measure-units-list/loyalty-products-measure-units-list.component';
import {LoyaltyProductsTableItemComponent} from './components/loyalty-products-table-item/loyalty-products-table-item.component';
import {LoyaltyGroupsService} from '../../_services/loyalty-groups.service';
import {LoyaltyManagementComponent} from './components/loyalty-management/loyalty-management.component';
import {LoyaltyManagementCreatingComponent} from './components/loyalty-management-creating/loyalty-management-creating.component';
import {LoyaltyManagementCreatingSelectValueTypeComponent} from './components/loyalty-management-creating-select-value-type/loyalty-management-creating-select-value-type.component';
import {LoyaltyManagementCreatingSelectMerchantCoinComponent} from './components/loyalty-management-creating-select-merchant-coin/loyalty-management-creating-select-merchant-coin.component';
import {LoyaltyManagementCreatingSelectActivationPolicyComponent} from './components/loyalty-management-creating-select-activation-policy/loyalty-management-creating-select-activation-policy.component';
import {CoinsService} from '../../_services/coins.service';
import {MediaFilesService} from '../../_services/media-files.service';
import {LoyaltyRulesCreatingSelectComponent} from './components/loyalty-rules-creating-select/loyalty-rules-creating-select.component';
import {PosService} from '../../_services/pos.service';
import {IssuersService} from '../../_services/issuers.service';
import {LoyaltyRulesCreatingAddingRuleComponent} from './components/loyalty-rules-creating-adding-rule/loyalty-rules-creating-adding-rule.component';
import {LoyaltyRulesCreatingAddingGroupsComponent} from './components/loyalty-rules-creating-adding-groups/loyalty-rules-creating-adding-groups.component';
import {LoyaltyRulesCreatingAddingPosComponent} from './components/loyalty-rules-creating-adding-pos/loyalty-rules-creating-adding-pos.component';
import {LoyaltyRulesCreatingAddingProductsComponent} from './components/loyalty-rules-creating-adding-products/loyalty-rules-creating-adding-products.component';
import {LoyaltyRulesCreatingAddingIssuerComponent} from './components/loyalty-rules-creating-adding-issuer/loyalty-rules-creating-adding-issuer.component';
import {LoyaltyRulesCreatingAddingCategoriesComponent} from './components/loyalty-rules-creating-adding-categories/loyalty-rules-creating-adding-categories.component';
import {CategoriesService} from '../../_services/categories.service';
import {LoyaltyRulesTableItemDetailsComponent} from './components/loyalty-rules-table-item-details/loyalty-rules-table-item-details.component';
import {LoyaltyProductsSearchComponent} from './components/loyalty-products-search/loyalty-products-search.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {UiModule} from '../../_modules/ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(LOYALTY_RULES_ROUTES),
        UiModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    declarations: [
        LoyaltyRulesComponent,
        LoyaltyRulesTableComponent,
        LoyaltyRulesCreatingComponent,
        LoyaltyRulesTableItemComponent,
        LoyaltyGroupsComponent,
        LoyaltyGroupsTableComponent,
        LoyaltyGroupsCreatingComponent,
        LoyaltyGroupsTableItemComponent,
        LoyaltyProductsComponent,
        LoyaltyProductsCreatingComponent,
        LoyaltyProductsTableComponent,
        LoyaltyProductsMeasureUnitsListComponent,
        LoyaltyProductsTableItemComponent,
        LoyaltyManagementComponent,
        LoyaltyManagementCreatingComponent,
        LoyaltyManagementCreatingSelectValueTypeComponent,
        LoyaltyManagementCreatingSelectMerchantCoinComponent,
        LoyaltyManagementCreatingSelectActivationPolicyComponent,
        LoyaltyRulesCreatingSelectComponent,
        LoyaltyRulesCreatingAddingRuleComponent,
        LoyaltyRulesCreatingAddingGroupsComponent,
        LoyaltyRulesCreatingAddingPosComponent,
        LoyaltyRulesCreatingAddingProductsComponent,
        LoyaltyRulesCreatingAddingIssuerComponent,
        LoyaltyRulesCreatingAddingCategoriesComponent,
        LoyaltyRulesTableItemDetailsComponent,
        LoyaltyProductsSearchComponent
    ],
    providers: [
        LoyaltyRulesService,
        ProductsService,
        LoyaltyGroupsService,
        CoinsService,
        MediaFilesService,
        PosService,
        IssuersService,
        CategoriesService,
        SnackBarService
    ],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent]
})
export class LoyaltyRulesModule {
}
