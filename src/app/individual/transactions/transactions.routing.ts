import {Routes} from '@angular/router';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {TransactionBillComponent} from './components/transaction-bill/transaction-bill.component';
import {InProgressComponent} from './components/statuses/in-progress/in-progress.component';

export const TRANSACTIONS_ROUTES: Routes = [
    {path: '', component: TransactionsComponent},
    {path: 'bill/:id', component: TransactionBillComponent},
    {path: 'status/in-progress/:tx', component: InProgressComponent},
    {path: '**', redirectTo: ''}
];
