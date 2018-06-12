import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WithdrawalComponent} from './components/withdrawal/withdrawal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {WITHDRAWAL_ROUTES} from './withdrawal.routing';
import {WithdrawalService} from '../../_services/withdrawal.service';
import {WithdrawalServicesComponent} from './components/withdrawal-services/withdrawal-services.component';
import {WithdrawalWalletComponent} from './components/withdrawal-wallet/withdrawal-wallet.component';
import {CoinsService} from '../../_services/coins.service';
import {WithdrawalAmountComponent} from './components/withdrawal-amount/withdrawal-amount.component';
import {WithdrawalFormComponent} from './components/withdrawal-form/withdrawal-form.component';
import {WithdrawalResultComponent} from './components/withdrawal-result/withdrawal-result.component';
import {BankWithdrawalComponent} from './components/bank-withdrawal/bank-withdrawal/bank-withdrawal.component';
import {BankWithdrawalFormComponent} from './components/bank-withdrawal/bank-withdrawal-form/bank-withdrawal-form.component';
import {BankWithdrawalResultComponent} from './components/bank-withdrawal/bank-withdrawal-result/bank-withdrawal-result.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {GatesService} from '../../_services/gates.service';
import {CashDeskWithdrawalComponent} from './components/cash-desk-withdrawal/cash-desk-withdrawal/cash-desk-withdrawal.component';
import {CashDesksComponent} from './components/cash-desk-withdrawal/cash-desks/cash-desks.component';
import {CashDesksService} from '../../_services/cash-desks.service';
import { CashDeskFormComponent } from './components/cash-desk-withdrawal/cash-desk-form/cash-desk-form.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {CashDeskWithdrawalService} from '../../_services/cash-desk-withdrawal.service';
import { CashDeskResultComponent } from './components/cash-desk-withdrawal/cash-desk-result/cash-desk-result.component';
import {PaymentMethodsModule} from '../../_modules/payment-methods/payment-methods.module';
import { WithdrawalTransactionComponent } from './components/withdrawal-transaction/withdrawal-transaction.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(WITHDRAWAL_ROUTES),
        I18nPipeModule,
        PaymentMethodsModule,
        UiModule
    ],
    declarations: [
        WithdrawalComponent,
        WithdrawalServicesComponent,
        WithdrawalWalletComponent,
        WithdrawalAmountComponent,
        WithdrawalFormComponent,
        WithdrawalResultComponent,
        BankWithdrawalComponent,
        BankWithdrawalFormComponent,
        BankWithdrawalResultComponent,
        CashDeskWithdrawalComponent,
        CashDesksComponent,
        CashDeskFormComponent,
        CashDeskResultComponent,
        WithdrawalTransactionComponent
    ],
    providers: [WithdrawalService, GatesService, CoinsService, CashDesksService, CashDeskWithdrawalService]
})
export class WithdrawalModule {
}
