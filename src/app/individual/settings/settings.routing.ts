import {Routes} from '@angular/router';
import {SettingsComponent} from './components/settings/settings.component';
import {SettingsSecurityComponent} from './components/settings-security/settings-security.component';
import {SettingsUserComponent} from './components/settings-user/settings-user.component';
import {SettingsFilesComponent} from './components/settings-files/settings-files.component';
import {SettingsSmartCardsComponent} from './components/settings-smart-cards/settings-smart-cards.component';
import {SettingsPaymentCardsComponent} from './components/settings-payment-cards/settings-payment-cards.component';
import {SettingsBankComponent} from './components/settings-bank/settings-bank.component';
import {AddingCardComponent} from './components/adding-card/adding-card.component';
import {AddingBankComponent} from './components/adding-bank/adding-bank.component';
import {EditBankComponent} from "./components/edit-bank/edit-bank.component";

export const SETTINGS_ROUTES: Routes = [
    {
        path: '', component: SettingsComponent, children: [
        {path: 'user', component: SettingsUserComponent},
        {path: 'security', component: SettingsSecurityComponent},
        {path: 'files', component: SettingsFilesComponent},
        {path: 'card', component: SettingsSmartCardsComponent},
        {path: 'payment-cards', component: SettingsPaymentCardsComponent},
        {path: 'payment-cards/attach', component: AddingCardComponent},
        {path: 'bank', component: SettingsBankComponent},
        {path: 'bank/add', component: AddingBankComponent},
        {path: 'bank/edit', component: EditBankComponent},
        {path: '', redirectTo: 'user'}
    ]
    },
    {path: '**', redirectTo: ''}
];
