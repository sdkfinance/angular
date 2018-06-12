import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './components/settings/settings.component';
import {RouterModule} from '@angular/router';
import {SETTINGS_ROUTES} from './settings.routing';
import {SettingsUserComponent} from './components/settings-user/settings-user.component';
import {SettingsSecurityComponent} from './components/settings-security/settings-security.component';
import {SettingsService} from '../../_services/settings.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonSettingsModule} from '../../_modules/common-settings/common-settings.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {UiModule} from '../../_modules/ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SETTINGS_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        CommonSettingsModule,
        I18nPipeModule,
        UiModule
    ],
    declarations: [SettingsComponent, SettingsUserComponent, SettingsSecurityComponent],
    providers: [SettingsService]
})
export class SettingsModule {
}
