import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {routes} from './authorization.routing';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {NewPasswordComponent} from './components/new-password/new-password.component';
import {SignupComponent} from './components/signup/signup.component';
import {EmailSentComponent} from './components/email-sent/email-sent.component';
import {SmsSentComponent} from './components/sms-sent/sms-sent.component';
import {ConfirmComponent} from './components/confirm/confirm.component';
import {UiModule} from '../ui/ui.module';
import {I18nPipeModule} from '../i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        I18nPipeModule
    ],
    declarations: [LoginComponent, ResetPasswordComponent, NewPasswordComponent, SignupComponent, EmailSentComponent, SmsSentComponent, ConfirmComponent]
})
export class AuthorizationModule {


}
