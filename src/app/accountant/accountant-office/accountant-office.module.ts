import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountantOfficeComponent} from './component/accountant-office/accountant-office.component';
import {RouterModule} from '@angular/router';
import {ACCOUNTANT_OFFICE_ROUTES} from './accountant-office.routing';
import {UiModule} from '../../_modules/ui/ui.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {SettingsService} from '../../_services/settings.service';
import {HttpClientModule} from '@angular/common/http';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ACCOUNTANT_OFFICE_ROUTES),
        UiModule,
        I18nPipeModule,
        HttpClientModule
    ],
    declarations: [AccountantOfficeComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService]
})
export class AccountantOfficeModule {
}
