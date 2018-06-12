import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CfoMenuComponent} from './components/cfo-menu/cfo-menu.component';
import {CfoOfficeComponent} from './components/cfo-office/cfo-office.component';
import {RouterModule} from '@angular/router';
import {CFO_OFFICE_ROUTES} from './cfo-office.routing';
import {UiModule} from '../../_modules/ui/ui.module';
import {SettingsService} from '../../_services/settings.service';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {HttpClientModule} from '@angular/common/http';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CFO_OFFICE_ROUTES),
        UiModule,
        I18nPipeModule,
        HttpClientModule
    ],
    declarations: [CfoMenuComponent, CfoOfficeComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService]
})
export class CfoOfficeModule {
}
