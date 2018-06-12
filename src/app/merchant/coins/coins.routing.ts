import {Routes} from "@angular/router";
import {CoinsComponent} from "./components/coins/coins.component";

export const COINS_ROUTERS: Routes = [
    {path: '', component: CoinsComponent},
    {path: '**', redirectTo: ''}
];
