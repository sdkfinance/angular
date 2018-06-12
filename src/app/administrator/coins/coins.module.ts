import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinsComponent} from './components/coins/coins.component';
import {CoinsTableComponent} from './components/coins-table/coins-table.component';
import {CoinsItemComponent} from './components/coins-item/coins-item.component';
import {RouterModule} from '@angular/router';
import {COINS_ROUTES} from './coins.routing';
import {CoinsService} from '../../_services/coins.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(COINS_ROUTES)
    ],
    declarations: [CoinsComponent, CoinsTableComponent, CoinsItemComponent],
    providers: [CoinsService]
})
export class CoinsModule {
}
