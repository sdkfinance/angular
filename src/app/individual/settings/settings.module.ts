import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './components/settings/settings.component';
import {RouterModule} from '@angular/router';
import {SETTINGS_ROUTES} from './settings.routing';
import {SettingsUserComponent} from './components/settings-user/settings-user.component';
import {SettingsSecurityComponent} from './components/settings-security/settings-security.component';
import {SettingsService} from '../../_services/settings.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingsUserContactsComponent} from './components/settings-user-contacts/settings-user-contacts.component';
import {SettingsFilesComponent} from './components/settings-files/settings-files.component';
import {MediaFilesService} from '../../_services/media-files.service';
import {DocumentStatusPipe} from '../../_pipes/document-status.pipe';
import {ProfileStatusPipe} from '../../_pipes/profile-status.pipe';
import {SettingsSmartCardsComponent} from './components/settings-smart-cards/settings-smart-cards.component';
import {SmartCardsService} from '../../_services/smart-cards.service';
import {SettingsBankComponent} from './components/settings-bank/settings-bank.component';
import {SettingsPaymentCardsComponent} from './components/settings-payment-cards/settings-payment-cards.component';
import {AddingCardComponent} from './components/adding-card/adding-card.component';
import {CardService} from '../../_services/card.service';
import {AddingCardFormComponent} from './components/adding-card-form/adding-card-form.component';
import {AddingCardConfirmComponent} from './components/adding-card-confirm/adding-card-confirm.component';
import {BankService} from '../../_services/bank.service';
import {BankFormComponent} from './components/bank-form/bank-form.component';
import {AddingBankComponent} from './components/adding-bank/adding-bank.component';
import {EditBankComponent} from './components/edit-bank/edit-bank.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {UiModule} from '../../_modules/ui/ui.module';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {DocumentComponent} from './components/document/document.component';
import {CommonSettingsModule} from '../../_modules/common-settings/common-settings.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UiModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterModule.forChild(SETTINGS_ROUTES),
        CommonSettingsModule,
        I18nPipeModule
    ],
    declarations: [
        SettingsComponent,
        SettingsUserComponent,
        SettingsSecurityComponent,
        SettingsUserContactsComponent,
        SettingsFilesComponent,
        SettingsSmartCardsComponent,
        SettingsBankComponent,
        SettingsPaymentCardsComponent,
        AddingCardComponent,
        AddingCardFormComponent,
        AddingCardConfirmComponent,
        BankFormComponent,
        AddingBankComponent,
        EditBankComponent,
        DocumentComponent
    ],
    providers: [SettingsService, MediaFilesService, SmartCardsService, CardService, BankService, SnackBarService],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent]
})
export class SettingsModule {
}
