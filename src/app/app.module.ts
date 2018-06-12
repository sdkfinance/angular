import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ROUTERS} from './app.routing';
import {RouterModule} from '@angular/router';
import {AuthorizationService} from './_services/authorization.service';
import {RoleGuard} from './_services/authguards/role-guard';
import {NoRoleGuard} from './_services/authguards/norole-guard';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {I18nService} from './_services/i18n.service';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTERS),
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2GoogleChartsModule,
    ],
    providers: [
        AuthorizationService,
        RoleGuard,
        NoRoleGuard,
        I18nService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
