import {Routes} from "@angular/router";
import {SettingsComponent} from "./components/settings/settings.component";
import {SettingsUserComponent} from "./components/settings-user/settings-user.component";
import {SettingsSecurityComponent} from "./components/settings-security/settings-security.component";

export const SETTINGS_ROUTES: Routes = [
    {
        path: '', component: SettingsComponent, children: [
        {path: 'user', component: SettingsUserComponent},
        {path: 'security', component: SettingsSecurityComponent},
        {path: '', redirectTo: 'user'}
    ]
    }
];
