import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndividualMenuComponent} from './components/individual-menu/individual-menu.component';
import {IndividualOfficeComponent} from './components/individual-office/individual-office.component';
import {RouterModule} from '@angular/router';
import {INDIVIDUAL_OFFICE_ROUTES} from './individual-office.routing';
import {SettingsService} from '../../_services/settings.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {HttpClientModule} from '@angular/common/http';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(INDIVIDUAL_OFFICE_ROUTES),
        UiModule,
        I18nPipeModule,
        HttpClientModule
    ],
    declarations: [IndividualMenuComponent, IndividualOfficeComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService]
})
export class IndividualOfficeModule {
}
