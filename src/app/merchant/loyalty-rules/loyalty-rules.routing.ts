import {Routes} from "@angular/router";
import {LoyaltyRulesComponent} from "./components/loyalty-rules/loyalty-rules.component";
import {LoyaltyGroupsComponent} from "./components/loyalty-groups/loyalty-groups.component";
import {LoyaltyProductsComponent} from "./components/loyalty-products/loyalty-products.component";
import {LoyaltyManagementComponent} from "./components/loyalty-management/loyalty-management.component";

export const LOYALTY_RULES_ROUTES: Routes = [
    {path: '', component: LoyaltyRulesComponent},
    {path: 'generator', component: LoyaltyGroupsComponent},
    {path: 'products', component: LoyaltyProductsComponent},
    {path: 'rule-management', component: LoyaltyManagementComponent}
];
