import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './components/clients/clients.component';
import {RouterModule} from '@angular/router';
import {CLIENTS_ROUTES} from './clients.routing';
import {CreateUserFormComponent} from './components/create-user-form/create-user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientsListComponent} from './components/clients-list/clients-list.component';
import {ClientItemComponent} from './components/client-item/client-item.component';
import {ClientActionsComponent} from './components/client-actions/client-actions.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {ClientsSearchComponent} from './components/clients-search/clients-search.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CLIENTS_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        UiModule
    ],
    declarations: [
        ClientsComponent,
        CreateUserFormComponent,
        ClientsListComponent,
        ClientItemComponent,
        ClientActionsComponent,
        ClientsSearchComponent,
        ClientDetailsComponent
    ]
})
export class ClientsModule {
}
