import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IdentificationUsersComponent} from './components/identification-users/identification-users.component';
import {RouterModule} from '@angular/router';
import {IDENTIFICATION_USERS_ROUTES} from './identification-users.routing';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UsersTableItemComponent} from './components/users-table-item/users-table-item.component';
import {DocumentsTableComponent} from './components/documents-table/documents-table.component';
import {DocumentsTableItemComponent} from './components/documents-table-item/documents-table-item.component';
import {ProfileDocumentsService} from '../../_services/profile-documents.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {ClientsService} from '../../_services/clients.service';
import {ProfileIdentificationService} from '../../_services/profile-identification.service';
import {IdentificationUsersService} from './services/identification-users.service';
import {FormsModule} from '@angular/forms';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
        FormsModule,
        RouterModule.forChild(IDENTIFICATION_USERS_ROUTES),
        I18nPipeModule
    ],
    declarations: [
        IdentificationUsersComponent,
        UsersTableComponent,
        UsersTableItemComponent,
        DocumentsTableComponent,
        DocumentsTableItemComponent
    ],
    providers: [ProfileDocumentsService, ProfileIdentificationService, ClientsService, IdentificationUsersService]
})
export class IdentificationUsersModule {
}
