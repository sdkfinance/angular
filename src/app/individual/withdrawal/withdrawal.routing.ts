import {Routes} from '@angular/router';
import {WithdrawalComponent} from './components/withdrawal/withdrawal.component';
import {WithdrawalWalletComponent} from './components/withdrawal-wallet/withdrawal-wallet.component';
import {WithdrawalServicesComponent} from './components/withdrawal-services/withdrawal-services.component';
import {BankWithdrawalComponent} from './components/bank-withdrawal/bank-withdrawal/bank-withdrawal.component';
import {CashDeskWithdrawalComponent} from './components/cash-desk-withdrawal/cash-desk-withdrawal/cash-desk-withdrawal.component';
import {WithdrawalTransactionComponent} from './components/withdrawal-transaction/withdrawal-transaction.component';

export const WITHDRAWAL_ROUTES: Routes = [
    {path: '', component: WithdrawalComponent, children: [
        {path: '', component: WithdrawalWalletComponent},
        {path: ':serial', component: WithdrawalServicesComponent},
        {path: ':serial/bank-transfer', component: BankWithdrawalComponent},
        {path: ':serial/cashbox', component: CashDeskWithdrawalComponent},
        {path: ':serial/:way/:id', component: WithdrawalTransactionComponent},
    ]},
    {path: '**', redirectTo: ''}
];
