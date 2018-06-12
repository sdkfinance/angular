import {Routes} from '@angular/router';
import {AdminOfficeComponent} from './components/admin-office/admin-office.component';

export const ADMIN_OFFICE_ROUTES: Routes = [
    {
        path: '', component: AdminOfficeComponent, children: [
            {
                path: 'management',
                loadChildren: 'app/administrator/user-management/user-management.module#UserManagementModule'
            },
            {
                path: 'issuers',
                loadChildren: 'app/administrator/issuers/issuers.module#IssuersModule'
            },
            {
                path: 'coins',
                loadChildren: 'app/administrator/coins/coins.module#CoinsModule'
            },
            // {
            //     path: 'transactions',
            //     loadChildren: 'app/administrator/admin-transactions/admin-transactions.module#AdminTransactionsModule'
            // },
            // {
            //     path: 'news',
            //     loadChildren: 'app/administrator/news/news.module#NewsModule'
            // },
            {
                path: 'i18n',
                loadChildren: 'app/administrator/bundle-configurator/bundle-configurator.module#BundleConfiguratorModule'
            },
            {
                path: 'monitoring',
                loadChildren: 'app/administrator/monitoring/monitoring.module#MonitoringModule'
            },
            {
                path: 'profile',
                loadChildren: 'app/administrator/settings/settings.module#SettingsModule'
            },
            {
                path: '**',
                redirectTo: 'management'
            }
        ]
    },

    {path: '**', redirectTo: ''}
];
