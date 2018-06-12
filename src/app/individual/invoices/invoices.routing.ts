import {Routes} from '@angular/router';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoiceBillComponent} from './components/invoice-bill/invoice-bill.component';
import {CreateHoldComponent} from './components/create-hold/create-hold.component';
import {CardHoldsComponent} from './components/card-holds/card-holds.component';

export const INVOICES_ROUTES: Routes = [
    {path: '', component: InvoicesComponent},
    {path: 'view/:direction/:id', component: InvoiceBillComponent},
    {path: 'hold/:id', component: CreateHoldComponent},
    {path: 'holds', component: CardHoldsComponent}, // , canActivate: [RoleGuard], data: {roles: ['merchant']}
    {path: '**', redirectTo: ''}
];
