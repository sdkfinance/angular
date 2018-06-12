import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SETTINGS_ROUTES} from "./settings.routing";
import {SettingsComponent} from "./components/settings/settings.component";
import {SettingsService} from "../../_services/settings.service";
import { SettingsPersonComponent } from './components/settings-person/settings-person.component';
import { SettingsContactComponent } from './components/settings-contact/settings-contact.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SETTINGS_ROUTES),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SettingsComponent,
        SettingsPersonComponent,
        SettingsContactComponent
    ],
    providers: [
        SettingsService
    ]
})
export class SettingsModule {
}
