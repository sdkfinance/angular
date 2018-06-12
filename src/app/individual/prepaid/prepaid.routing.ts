import {Routes} from '@angular/router';
import {PrepaidComponent} from './components/prepaid/prepaid.component';

export const PREPAID_ROUTES: Routes = [
    {path: '', component: PrepaidComponent},
    {path: '**', redirectTo: ''}
];
