import {Routes} from '@angular/router';
import {IndividualOfficeComponent} from './components/individual-office/individual-office.component';

export const INDIVIDUAL_OFFICE_ROUTES: Routes = [
    {
        path: '', component: IndividualOfficeComponent, children: [

            {
                path: 'wallets',
                loadChildren: 'app/individual/wallets/wallets.module#WalletsModule'
            },
            {
                path: 'transactions',
                loadChildren: 'app/individual/transactions/transactions.module#TransactionsModule'
            },
            {
                path: 'invoices',
                loadChildren: 'app/individual/invoices/invoices.module#InvoicesModule'
            },
            {
                path: 'profile',
                loadChildren: 'app/individual/settings/settings.module#SettingsModule'
            },
            {
                path: 'vouchers',
                loadChildren: 'app/individual/prepaid/prepaid.module#PrepaidModule'
            },
            {
                path: 'payments',
                loadChildren: 'app/individual/online-payments/online-payments.module#OnlinePaymentsModule'
            },
            {
                path: 'withdrawal',
                loadChildren: 'app/individual/withdrawal/withdrawal.module#WithdrawalModule'
            },
            {
                path: 'conversations',
                loadChildren: 'app/_modules/conversations/conversations.module#ConversationsModule'
            },
            {path: '', redirectTo: 'wallets'}
        ]
    },
    {path: '**', redirectTo: ''}
];
