import {Routes} from '@angular/router';
import {ContractManagementComponent} from './components/contracts/contract-management/contract-management.component';
import {TransactionsTableComponent} from './components/transactions/transactions-table/transactions-table.component';
import {CreateLimitComponent} from './components/transactions/create-limit/create-limit.component';
import {EditLimitProfileComponent} from './components/transactions/edit-limit-profile/edit-limit-profile.component';
import {EditCommissionProfileComponent} from './components/transactions/edit-commission-profile/edit-commission-profile.component';
import {ContractDetailsComponent} from './components/contracts/contract-details/contract-details.component';
import {GatesTableComponent} from './components/gates/gates-table/gates-table.component';
import {AddProviderComponent} from './components/gates/add-provider/add-provider.component';
import {EditCommissionComponent} from './components/gates/edit-commission/edit-commission.component';
import {AddCommissionComponent} from './components/gates/add-commission/add-commission.component';
import {AddLimitComponent} from './components/gates/add-limit/add-limit.component';
import {EditLimitComponent} from './components/gates/edit-limit/edit-limit.component';
import {ProductsTableComponent} from './components/products/products-table/products-table.component';
import {EditProductCommissionComponent} from './components/products/edit-product-commission/edit-product-commission.component';
import {AddProductLimitComponent} from './components/products/add-product-limit/add-product-limit.component';

export const CONTRACT_MANAGEMENT_ROUTES: Routes = [
    {path: '', component: ContractManagementComponent},
    {
        path: ':id', component: ContractDetailsComponent, children: [
            {path: 'transactions', component: TransactionsTableComponent},
            {path: 'transactions/:profileId/edit', component: EditCommissionProfileComponent},
            {path: 'transactions/:profileId/limit/add', component: CreateLimitComponent},
            {path: 'transactions/:profileId/limit/edit/:limitId', component: EditLimitProfileComponent},
            {path: 'gates', component: GatesTableComponent},
            {path: 'gates/add/:providerId', component: AddProviderComponent},
            {path: 'gates/:profileId/add', component: AddCommissionComponent},
            {path: 'gates/:profileId/edit', component: EditCommissionComponent},
            {path: 'gates/:profileId/add-limit', component: AddLimitComponent},
            {path: 'gates/:profileId/edit-limit/:limitId', component: EditLimitComponent},
            {path: 'products', component: ProductsTableComponent},
            {path: 'products/add/:providerId', component: AddProviderComponent},
            {path: 'products/:profileId/add', component: AddCommissionComponent},
            {path: 'products/:profileId/edit', component: EditProductCommissionComponent},
            {path: 'products/:profileId/add-limit', component: AddProductLimitComponent},
            {path: 'products/:profileId/edit-limit/:limitId', component: EditLimitComponent},
            {path: '**', redirectTo: 'transactions'}
        ]
    },
    {path: '**', redirectTo: ''}
];
