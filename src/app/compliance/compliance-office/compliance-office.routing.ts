import {Routes} from '@angular/router';
import {ComplianceOfficeComponent} from './components/compliance-office/compliance-office.component';

export const COMPLIANCE_OFFICE_ROUTES: Routes = [
    {
        path: '', component: ComplianceOfficeComponent, children: [
            {
                path: 'identification',
                loadChildren: 'app/compliance/identification-users/identification-users.module#IdentificationUsersModule'
            },
            {
                path: 'management',
                loadChildren: 'app/compliance/user-management/user-management.module#UserManagementModule'
            },
            {
                path: 'profile',
                loadChildren: 'app/compliance/settings/settings.module#SettingsModule'
            },
            {
                path: 'conversations',
                loadChildren: 'app/_modules/conversations/conversations.module#ConversationsModule'
            },
            {
                path: '',
                redirectTo: 'identification'
            }
        ]
    },
    {path: '**', redirectTo: ''}
];
