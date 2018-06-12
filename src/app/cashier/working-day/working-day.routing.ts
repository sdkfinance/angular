import {Routes} from '@angular/router';
import {WorkingDayComponent} from './components/working-day/working-day.component';
import {TopUpWalletComponent} from './components/top-up/top-up-wallet/top-up-wallet.component';
import {SystemOperationsComponent} from './components/system-operations/system-operations.component';
import {WithdrawalComponent} from './components/withdrawal/withdrawal/withdrawal.component';

export const WORKING_DAY_ROUTES: Routes = [
    {path: '', component: WorkingDayComponent},
    {path: 'top-up', component: TopUpWalletComponent},
    {path: 'withdrawal', component: WithdrawalComponent},
    {path: 'operations', component: SystemOperationsComponent},
    {path: '**', redirectTo: ''}
];
