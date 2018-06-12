import {Routes} from '@angular/router';
import {AdminTransactionsComponent} from "./components/admin-transactions/admin-transactions.component";

export const ADMIN_TRANSACTIONS_ROUTES: Routes = [
    {path: '', component: AdminTransactionsComponent},
    {path: '**', redirectTo: ''}
]
