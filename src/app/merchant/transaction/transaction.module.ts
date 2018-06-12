import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {RouterModule} from "@angular/router";
import {TRANSACTION_ROUTES} from "./transaction.routes";
import {HTTP_INTERCEPTOR} from "../../_services/interceptors/http-interceptor";
import {TransactionService} from "../../_services/transaction.service";
import {TransactionTableComponent} from './components/transaction-table/transaction-table.component';
import {TransactionTableItemComponent} from './components/transaction-table-item/transaction-table-item.component';
import {TransactionCheckComponent} from './components/transaction-check/transaction-check.component';
import {TransactionCheckDetailsComponent} from './components/transaction-check-details/transaction-check-details.component';
import {TransactionCheckTableComponent} from './components/transaction-check-table/transaction-check-table.component';
import {BonusesDetailsComponent} from './components/bonuses-details/bonuses-details.component';
import {BonusesDetailsIttemComponent} from './components/bonuses-details/bonuses-details-ittem/bonuses-details-ittem.component';
import {IsEmptyPipe} from "../../_pipes/is-empty.pipe";
import {TransactionsSearchComponent} from './components/transactions-search/transactions-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TRANSACTION_ROUTES),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [TransactionsComponent, TransactionTableComponent,
        TransactionTableItemComponent, TransactionCheckComponent,
        TransactionCheckDetailsComponent, TransactionCheckTableComponent, BonusesDetailsComponent, BonusesDetailsIttemComponent,
        IsEmptyPipe, TransactionsSearchComponent],
    providers: [HTTP_INTERCEPTOR, TransactionService]
})
export class TransactionModule {

}
