import {Routes} from '@angular/router';
import {CoinsComponent} from './components/coins/coins.component';

export const COINS_ROUTES: Routes = [
    {path: '', component: CoinsComponent},
    {path: '**', redirectTo: ''}
];
