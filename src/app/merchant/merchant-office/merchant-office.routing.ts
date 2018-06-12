import {Routes} from '@angular/router';
import {MerchantOfficeComponent} from './components/merchant-office/merchant-office.component';

export const MERCHANT_OFFICE_ROUTES: Routes = [
    {
        path: '', component: MerchantOfficeComponent, children: [
            {
                path: 'wallets',
                loadChildren: 'app/individual/wallets/wallets.module#WalletsModule'
            },
            {
                path: 'transactions',
                loadChildren: 'app/individual/transactions/transactions.module#TransactionsModule'
            },
            {
                path: 'invoices/create',
                loadChildren: 'app/merchant/invoice-creating/invoice-creating.module#InvoiceCreatingModule'
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
                path: 'pos',
                loadChildren: 'app/merchant/pos/pos.module#PosModule'
            },
            {
                path: 'conversations',
                loadChildren: 'app/_modules/conversations/conversations.module#ConversationsModule'
            },
            {
                path: '',
                redirectTo: 'wallets'
            }
            // {path: 'news', loadChildren: 'app/merchant/news/news.module#NewsModule'},
            // {path: 'coins', loadChildren: 'app/merchant/coins/coins.module#CoinsModule'},
            // {path: 'loyalty-rules', loadChildren: 'app/merchant/loyalty-rules/loyalty-rules.module#LoyaltyRulesModule'},
            // {path: 'transactions', loadChildren: 'app/merchant/transaction/transaction.module#TransactionModule'},
            // {path: 'dashboard', loadChildren: 'app/merchant/dashboard/dashboard.module#DashboardModule'},
            // {path: 'operators', loadChildren: 'app/merchant/operators/operators.module#OperatorsModule'}
        ]
    },
    {path: '**', redirectTo: ''}
];
