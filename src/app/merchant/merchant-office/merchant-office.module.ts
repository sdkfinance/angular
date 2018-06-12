import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MerchantOfficeComponent} from './components/merchant-office/merchant-office.component';
import {SettingsService} from '../../_services/settings.service';
import {RouterModule} from '@angular/router';
import {MerchantMenuComponent} from './components/merchant-menu/merchant-menu.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {MERCHANT_OFFICE_ROUTES} from './merchant-office.routing';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {HttpClientModule} from '@angular/common/http';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
        RouterModule.forChild(MERCHANT_OFFICE_ROUTES),
        I18nPipeModule,
        HttpClientModule
    ],
    declarations: [MerchantOfficeComponent, MerchantMenuComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService]
})
export class MerchantOfficeModule {
}
