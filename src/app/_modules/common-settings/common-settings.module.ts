import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPasswordComponent} from './components/settings-password/settings-password.component';
import {FormsModule} from '@angular/forms';
import {I18nPipeModule} from '../i18n-pipe/i18n-pipe.module';
import {UiModule} from '../ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        I18nPipeModule,
        UiModule
    ],
    declarations: [SettingsPasswordComponent],
    exports: [SettingsPasswordComponent]
})
export class CommonSettingsModule {
}
