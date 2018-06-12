import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashierOfficeComponent} from './components/cashier-office/cashier-office.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {RouterModule} from '@angular/router';
import {CASHIER_OFFICE_ROUTES} from './cashier-office.routing';
import {UiModule} from '../../_modules/ui/ui.module';
import {SettingsService} from '../../_services/settings.service';
import {HttpClientModule} from '@angular/common/http';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';

@NgModule({
    imports: [
        CommonModule,
        I18nPipeModule,
        UiModule,
        RouterModule.forChild(CASHIER_OFFICE_ROUTES),
        HttpClientModule
    ],
    declarations: [CashierOfficeComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService]
})
export class CashierOfficeModule {
}
