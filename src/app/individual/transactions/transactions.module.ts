import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {RouterModule} from '@angular/router';
import {TRANSACTIONS_ROUTES} from './transactions.routing';
import {TransfersComponent} from './components/transfers/transfers/transfers.component';
import {TransferFormComponent} from './components/transfers/transfer-form/transfer-form.component';
import {TransferResultComponent} from './components/transfers/transfer-result/transfer-result.component';
import {CoinsService} from '../../_services/coins.service';
import {IssuersService} from '../../_services/issuers.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransferFormRecipientComponent} from './components/transfers/transfer-form-recipient/transfer-form-recipient.component';
import {TransferService} from '../../_services/transfer.service';
import {TransactionService} from '../../_services/transaction.service';
import {TransactionsTableComponent} from './components/history/transactions-table/transactions-table.component';
import {TransactionItemComponent} from './components/history/transaction-item/transaction-item.component';
import {OperationTypePipe} from '../../_pipes/operation-type.pipe';
import {ExchangeCurrencyComponent} from './components/exchange/exchange-currency/exchange-currency.component';
import {ExchangeFormComponent} from './components/exchange/exchange-form/exchange-form.component';
import {ExchangersListComponent} from './components/exchange/exchangers-list/exchangers-list.component';
import {ExchangeAmountComponent} from './components/exchange/exchange-amount/exchange-amount.component';
import {ExchangeConfirmComponent} from './components/exchange/exchange-confirm/exchange-confirm.component';
import {TransactionTypePipe} from '../../_pipes/transaction-type.pipe';
import {TransactionBillComponent} from './components/transaction-bill/transaction-bill.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {TransactionStatusPipe} from '../../_pipes/transaction-status.pipe';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {InProgressComponent} from './components/statuses/in-progress/in-progress.component';
import {PaymentMethodsModule} from '../../_modules/payment-methods/payment-methods.module';
import {GatesService} from '../../_services/gates.service';
import {TransactionsFiltersComponent} from './components/history/transactions-filters/transactions-filters.component';
import {TransactionsStorageService} from './services/transactions-storage.service';
import { TransactionsTableHeaderComponent } from './components/history/transactions-table-header/transactions-table-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(TRANSACTIONS_ROUTES),
        BsDatepickerModule.forRoot(),
        UiModule,
        I18nPipeModule,
        PaymentMethodsModule
    ],
    declarations: [
        TransactionsComponent,
        TransfersComponent,
        TransferFormComponent,
        TransferResultComponent,
        TransferFormRecipientComponent,
        TransactionsTableComponent,
        TransactionItemComponent,
        OperationTypePipe,
        ExchangeCurrencyComponent,
        ExchangeFormComponent,
        ExchangersListComponent,
        ExchangeAmountComponent,
        ExchangeConfirmComponent,
        TransactionTypePipe,
        TransactionStatusPipe,
        TransactionBillComponent,
        InProgressComponent,
        TransactionsFiltersComponent,
        TransactionsTableHeaderComponent
    ],
    providers: [
        CoinsService,
        IssuersService,
        TransferService,
        TransactionService,
        GatesService,
        TransactionsStorageService
    ]
})
export class TransactionsModule {
}
