import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {SignupComponent} from './components/signup/signup.component';
import {ConfirmComponent} from './components/confirm/confirm.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    // {path: 'rest', component: LoginComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'sign-up', component: SignupComponent},
    {path: 'confirm', component: ConfirmComponent},
    {path: '**', redirectTo: 'login'}
];
