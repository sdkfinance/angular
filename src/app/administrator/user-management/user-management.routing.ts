import {Routes} from '@angular/router';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserDetailsViewComponent} from './components/user-details-view/user-details-view.component';
import {UserDetailsEditComponent} from './components/user-details-edit/user-details-edit.component';
import {UserDetailsWalletsComponent} from './components/user-details-wallets/user-details-wallets.component';
import {SmartCardsComponent} from './components/smart-cards/smart-cards.component';
import {SmartCardAddingComponent} from './components/smart-card-adding/smart-card-adding.component';

export const USER_MANAGEMENT_ROUTES: Routes = [
    {
        path: '', component: UserManagementComponent, children: [
        {path: '', component: UsersTableComponent},
        {
            path: ':id', component: UserDetailsComponent, children: [
            {path: 'view', component: UserDetailsViewComponent},
            {path: 'edit', component: UserDetailsEditComponent},
            {path: 'wallets', component: UserDetailsWalletsComponent},
            {path: 'smart-cards', component: SmartCardsComponent},
            {path: 'smart-cards/add', component: SmartCardAddingComponent},
            {path: '', redirectTo: 'view'},
            {path: '**', redirectTo: 'view'}
        ]
        }
    ]
    }
];
