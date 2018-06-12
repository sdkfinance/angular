import {Routes} from '@angular/router';
import {RoleGuard} from './_services/authguards/role-guard';

export const ROUTERS: Routes = [
    // {
    //     path: '',
    //     canActivate: [NoRoleGuard],
    //     component: AppComponent
    // },
    {
        path: 'common',
        loadChildren: './_modules/common-pages/common-pages.module#CommonPagesModule',
    },
    {
        path: 'auth',
        loadChildren: './_modules/authorization/authorization.module#AuthorizationModule',
        canActivate: [RoleGuard],
        data: {roles: ['anonym']}
    },
    {
        path: 'merchant',
        loadChildren: './merchant/merchant-office/merchant-office.module#MerchantOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['merchant']}
    },
    {
        path: 'administrator',
        loadChildren: './administrator/admin-office/admin-office.module#AdminOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['administrator']}
    },
    {
        path: 'individual',
        loadChildren: './individual/individual-office/individual-office.module#IndividualOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['individual'], office: 'individual'}
    },
    {
        path: 'compliance',
        loadChildren: './compliance/compliance-office/compliance-office.module#ComplianceOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['compliance_specialist']}
    },
    {
        path: 'cfo',
        loadChildren: './cfo/cfo-office/cfo-office.module#CfoOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['cfo']}
    },
    {
        path: 'accountant',
        loadChildren: './accountant/accountant-office/accountant-office.module#AccountantOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['accountant']}
    },
    {
        path: 'cashier',
        loadChildren: './cashier/cashier-office/cashier-office.module#CashierOfficeModule',
        canActivate: [RoleGuard],
        data: {roles: ['cashier']}
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
