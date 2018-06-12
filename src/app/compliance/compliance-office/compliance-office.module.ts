import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComplianceOfficeComponent} from './components/compliance-office/compliance-office.component';
import {ComplianceMenuComponent} from './components/compliance-menu/compliance-menu.component';
import {SettingsService} from '../../_services/settings.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {RouterModule} from '@angular/router';
import {COMPLIANCE_OFFICE_ROUTES} from './compliance-office.routing';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {HttpClientModule} from '@angular/common/http';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(COMPLIANCE_OFFICE_ROUTES),
        UiModule,
        I18nPipeModule,
        HttpClientModule
    ],
    declarations: [ComplianceOfficeComponent, ComplianceMenuComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService]
})
export class ComplianceOfficeModule {
}
