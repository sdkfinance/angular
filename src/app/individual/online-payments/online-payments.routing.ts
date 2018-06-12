import {Routes} from "@angular/router";
import {OnlinePaymentsComponent} from "./components/online-payments/online-payments.component";
import {OnlinePaymentsListComponent} from "./components/online-payments-list/online-payments-list.component";
import {OnlinePaymentsPayComponent} from "./components/online-payments-pay/online-payments-pay.component";

export const ONLINE_PAYMENTS_ROUTES: Routes = [
    {path: '', component: OnlinePaymentsComponent},
    {path: ':category', component: OnlinePaymentsListComponent},
    {path: ':category/pay/:id', component: OnlinePaymentsPayComponent},
    {path: '**', redirectTo: ''}
];
