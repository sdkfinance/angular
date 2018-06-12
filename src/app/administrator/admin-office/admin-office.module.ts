import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ADMIN_OFFICE_ROUTES} from './admin-office.routing';
import {AdminMenuComponent} from './components/admin-menu/admin-menu.component';
import {AdminOfficeComponent} from './components/admin-office/admin-office.component';
import {SettingsService} from '../../_services/settings.service';
import {ClientsService} from '../../_services/clients.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {AUTH_INTERCEPTOR} from '../../_services/interceptors/http-interceptors';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_OFFICE_ROUTES),
        UiModule,
        I18nPipeModule,
        HttpClientModule
    ],
    declarations: [AdminMenuComponent, AdminOfficeComponent],
    exports: [AdminOfficeComponent],
    providers: [AUTH_INTERCEPTOR, SettingsService, ClientsService]
})
export class AdminOfficeModule {
}
