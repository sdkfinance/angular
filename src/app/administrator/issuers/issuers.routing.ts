import {Routes} from '@angular/router';
import {IssuersComponent} from './components/issuers/issuers.component';
import {IssuerEditComponent} from './components/issuer-edit/issuer-edit.component';

export const ISSUERS_ROUTES: Routes = [
    {path: '', component: IssuersComponent},
    {path: 'edit', component: IssuerEditComponent},
    {path: '**', redirectTo: ''}
];
