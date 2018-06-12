import {Routes} from '@angular/router';
import {CashDesksComponent} from './components/cash-desks/cash-desks.component';
import {WithdrawalRequestsComponent} from './components/withdrawal-requests/withdrawal-requests/withdrawal-requests.component';

export const CASH_DESKS_ROUTES: Routes = [
    {path: '', component: CashDesksComponent},
    {path: ':id', component: WithdrawalRequestsComponent},
    {path: '**', redirectTo: ''}
];
