import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinsComponent} from './components/coins/coins.component';
import {CoinComponent} from './components/coin/coin.component';
import {RouterModule} from "@angular/router";
import {COINS_ROUTERS} from "./coins.routing";
import {CoinsService} from "../../_services/coins.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(COINS_ROUTERS)
    ],
    declarations: [CoinsComponent, CoinComponent],
    providers: [CoinsService]
})
export class CoinsModule {
}
