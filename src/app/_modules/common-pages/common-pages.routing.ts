import {Routes} from '@angular/router';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';

export const COMMON_PAGES_ROUTING: Routes = [
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: '**',
        redirectTo: 'terms-and-conditions'
    },
];
