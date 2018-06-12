import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTransactionsComponent} from './components/admin-transactions/admin-transactions.component';
import {ADMIN_TRANSACTIONS_ROUTES} from './admin-transactions.routing';
import {RouterModule} from '@angular/router';
import {AdminTransactionsTableComponent} from './components/admin-transactions-table/admin-transactions-table.component';
import {TransactionService} from '../../_services/transaction.service';
import {AdminTransactionsItemComponent} from './components/admin-transactions-item/admin-transactions-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_TRANSACTIONS_ROUTES)
    ],
    declarations: [AdminTransactionsComponent, AdminTransactionsTableComponent, AdminTransactionsItemComponent],
    providers: [TransactionService]
})
export class AdminTransactionsModule {
}
