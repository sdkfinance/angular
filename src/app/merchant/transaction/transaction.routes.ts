import {Routes} from '@angular/router';
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {BonusesDetailsComponent} from "./components/bonuses-details/bonuses-details.component";

export const TRANSACTION_ROUTES: Routes = [
    {path: '', component: TransactionsComponent},
    {path: 'bonuses-details/:id', component: BonusesDetailsComponent}

];

