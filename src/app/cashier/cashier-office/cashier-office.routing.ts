import {Routes} from '@angular/router';
import {CashierOfficeComponent} from './components/cashier-office/cashier-office.component';

export const CASHIER_OFFICE_ROUTES: Routes = [
    {path: '', component: CashierOfficeComponent, children: [
        {path: 'day', loadChildren: 'app/cashier/working-day/working-day.module#WorkingDayModule'},
        {path: '**', redirectTo: 'day'}
    ]}
];
