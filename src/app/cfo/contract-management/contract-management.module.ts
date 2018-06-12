import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ContractManagementComponent} from './components/contracts/contract-management/contract-management.component';
import {RouterModule} from '@angular/router';
import {CONTRACT_MANAGEMENT_ROUTES} from './contract-management.routing';
import {ContractsTableComponent} from './components/contracts/contracts-table/contracts-table.component';
import {ContractsItemComponent} from './components/contracts/contracts-item/contracts-item.component';
import {ContractsService} from '../../_services/contracts.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {TransactionsTableComponent} from './components/transactions/transactions-table/transactions-table.component';
import {TransactionsItemComponent} from './components/transactions/transactions-item/transactions-item.component';
import {CreateLimitComponent} from './components/transactions/create-limit/create-limit.component';
import {ContractManagementService} from './services/contract-management.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditLimitProfileComponent} from './components/transactions/edit-limit-profile/edit-limit-profile.component';
import {EditCommissionProfileComponent} from './components/transactions/edit-commission-profile/edit-commission-profile.component';
import {GatesTableComponent} from './components/gates/gates-table/gates-table.component';
import {ContractDetailsComponent} from './components/contracts/contract-details/contract-details.component';
import {ContractsGateService} from '../../_services/contracts-gate.service';
import {GateProvidersService} from '../../_services/gate-providers.service';
import {IssuersService} from '../../_services/issuers.service';
import {GatesItemComponent} from './components/gates/gates-item/gates-item.component';
import {GateCommissionsComponent} from './components/gates/gate-commissions/gate-commissions.component';
import {GateLimitComponent} from './components/gates/gate-limit/gate-limit.component';
import {AddProviderComponent} from './components/gates/add-provider/add-provider.component';
import {AddLimitComponent} from './components/gates/add-limit/add-limit.component';
import {EditLimitComponent} from './components/gates/edit-limit/edit-limit.component';
import {AddCommissionComponent} from './components/gates/add-commission/add-commission.component';
import {EditCommissionComponent} from './components/gates/edit-commission/edit-commission.component';
import {ProductsTableComponent} from './components/products/products-table/products-table.component';
import {ProductsItemComponent} from './components/products/products-item/products-item.component';
import {ProductCommissionsComponent} from './components/products/product-commissions/product-commissions.component';
import {ProductLimitComponent} from './components/products/product-limit/product-limit.component';
import {EditProductCommissionComponent} from './components/products/edit-product-commission/edit-product-commission.component';
import {AddProductLimitComponent} from './components/products/add-product-limit/add-product-limit.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {I18nPipe} from '../../_pipes/i18n.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CONTRACT_MANAGEMENT_ROUTES),
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        I18nPipeModule
    ],
    declarations: [ContractManagementComponent,
        ContractsTableComponent,
        ContractsItemComponent,
        TransactionsTableComponent,
        TransactionsItemComponent,
        CreateLimitComponent,
        EditLimitProfileComponent,
        EditCommissionProfileComponent,
        GatesTableComponent,
        ContractDetailsComponent,
        GatesItemComponent,
        GateCommissionsComponent,
        GateLimitComponent,
        AddProviderComponent,
        AddLimitComponent,
        EditLimitComponent,
        AddCommissionComponent,
        EditCommissionComponent,
        ProductsTableComponent,
        ProductsItemComponent,
        ProductCommissionsComponent,
        ProductLimitComponent,
        EditProductCommissionComponent,
        AddProductLimitComponent
    ],
    providers: [ContractsService, ContractManagementService, ContractsGateService, GateProvidersService, IssuersService, I18nPipe]
})
export class ContractManagementModule {
}
