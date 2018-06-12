import {Routes} from '@angular/router';
import {CfoOfficeComponent} from './components/cfo-office/cfo-office.component';

export const CFO_OFFICE_ROUTES: Routes = [
    {path: '', component: CfoOfficeComponent, children: [
            {path: 'contracts', loadChildren: 'app/cfo/contract-management/contract-management.module#ContractManagementModule'},
            {path: 'management', loadChildren: 'app/administrator/user-management/user-management.module#UserManagementModule'},
            {path: 'system-operations', loadChildren: 'app/cfo/system-operations/system-operations.module#SystemOperationsModule'},
            {path: 'conversations', loadChildren: 'app/_modules/conversations/conversations.module#ConversationsModule'},
            {path: 'profile', loadChildren: 'app/compliance/settings/settings.module#SettingsModule'},
            {path: '**', redirectTo: 'contracts'}
        ]}
];
