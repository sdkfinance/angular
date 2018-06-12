import {Routes} from '@angular/router';
import {AccountantOfficeComponent} from './component/accountant-office/accountant-office.component';

export const ACCOUNTANT_OFFICE_ROUTES: Routes = [
    {path: '', component: AccountantOfficeComponent, children: [
        {path: 'cash-desks', loadChildren: 'app/accountant/cash-desks/cash-desks.module#CashDesksModule'},
        {path: 'cash-operations', loadChildren: 'app/accountant/system-operations/system-operations.module#SystemOperationsModule'},
        {path: '**', redirectTo: 'cash-desks'}
    ]},
    {path: '**', redirectTo: ''}
];
