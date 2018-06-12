import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UsersTableItemComponent} from './components/users-table-item/users-table-item.component';
import {UserDetailsEditComponent} from './components/user-details-edit/user-details-edit.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserDetailsViewComponent} from './components/user-details-view/user-details-view.component';
import {UserDetailsWalletsComponent} from './components/user-details-wallets/user-details-wallets.component';
import {RouterModule} from '@angular/router';
import {USER_MANAGEMENT_ROUTES} from './user-management.routing';
import {ClientsService} from '../../_services/clients.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserManagementService} from './services/user-management.service';
import {SnackBarService} from '../../_services/snack-bar.service';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {CoinsService} from '../../_services/coins.service';
import {SmartCardsComponent} from './components/smart-cards/smart-cards.component';
import {SmartCardAddingComponent} from './components/smart-card-adding/smart-card-adding.component';
import {SmartCardCreatingFormComponent} from './components/smart-card-creating-form/smart-card-creating-form.component';
import {SmartCardsService} from '../../_services/smart-cards.service';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {OrganizationsService} from '../../_services/organizations.service';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
        FormsModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterModule.forChild(USER_MANAGEMENT_ROUTES),
        I18nPipeModule
    ],
    declarations: [
        UserManagementComponent,
        UsersTableComponent,
        UsersTableItemComponent,
        UserDetailsEditComponent,
        UserDetailsComponent,
        UserDetailsViewComponent,
        UserDetailsWalletsComponent,
        SmartCardsComponent,
        SmartCardAddingComponent,
        SmartCardCreatingFormComponent
    ],
    providers: [ClientsService, UserManagementService, SnackBarService, CoinsService, SmartCardsService, OrganizationsService],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent]
})
export class UserManagementModule {
}
