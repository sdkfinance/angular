import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IssuersComponent} from './components/issuers/issuers.component';
import {RouterModule} from '@angular/router';
import {ISSUERS_ROUTES} from './issuers.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IssuersService} from '../../_services/issuers.service';
import {IssuersTableComponent} from './components/issuers-table/issuers-table.component';
import {IssuersItemComponent} from './components/issuers-item/issuers-item.component';
import {IssuersCreateComponent} from './components/issuers-create/issuers-create.component';
import {UiModule} from '../../_modules/ui/ui.module';
import { IssuerEditComponent } from './components/issuer-edit/issuer-edit.component';
import {IssuerService} from './servises/issuer.service';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ISSUERS_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        I18nPipeModule
    ],
    declarations: [
        IssuersComponent,
        IssuersTableComponent,
        IssuersItemComponent,
        IssuersCreateComponent,
        IssuerEditComponent
    ],
    providers: [IssuersService, IssuerService]
})
export class IssuersModule {
}
