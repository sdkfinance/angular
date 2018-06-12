import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardAllUsersComponent} from './components/dashboard-all-users/dashboard-all-users.component';
import {DashboardBonusAddedComponent} from './components/dashboard-bonus-added/dashboard-bonus-added.component';
import {DashboardBonusChartsComponent} from './components/dashboard-bonus-charts/dashboard-bonus-charts.component';
import {DashboardBonusUsedComponent} from './components/dashboard-bonus-used/dashboard-bonus-used.component';
import {DashboardNewClientsComponent} from './components/dashboard-new-clients/dashboard-new-clients.component';
import {DashboardNewsComponent} from './components/dashboard-news/dashboard-news.component';
import {DashboardPosComponent} from './components/dashboard-pos/dashboard-pos.component';
import {DashboardPromotionsComponent} from './components/dashboard-promotions/dashboard-promotions.component';
import {DashboardPurchasesComponent} from './components/dashboard-purchases/dashboard-purchases.component';
import {RouterModule} from '@angular/router';
import {DASHBOARD_ROUTES} from './dashboard.routing';
import {PosService} from '../../_services/pos.service';
import {NewsService} from '../../_services/news.service';
import {DashboardNewsItemComponent} from './components/dashboard-news-item/dashboard-news-item.component';
import {DashboardPromotionsItemComponent} from './components/dashboard-promotions-item/dashboard-promotions-item.component';
import {LoyaltyRulesService} from '../../_services/loyalty-rules.service';
import {DashboardPurchasesItemComponent} from './components/dashboard-purchases-item/dashboard-purchases-item.component';
import {TransactionService} from '../../_services/transaction.service';
import {DashboardPurchasesItemCheckComponent} from './components/dashboard-purchases-item-check/dashboard-purchases-item-check.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {StatisticService} from '../../_services/statistic.service';
import {DashboardPosSelectComponent} from './components/dashboard-pos-select/dashboard-pos-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BonusesService} from '../../_services/bonuses.service';
import {CoinsService} from '../../_services/coins.service';
import {ChartModule} from 'angular2-chartjs';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DASHBOARD_ROUTES),
        UiModule,
        ReactiveFormsModule,
        FormsModule,
        ChartModule
    ],
    declarations: [
        DashboardComponent,
        DashboardAllUsersComponent,
        DashboardBonusAddedComponent,
        DashboardBonusChartsComponent,
        DashboardBonusUsedComponent,
        DashboardNewClientsComponent,
        DashboardNewsComponent,
        DashboardPosComponent,
        DashboardPromotionsComponent,
        DashboardPurchasesComponent,
        DashboardNewsItemComponent,
        DashboardPromotionsItemComponent,
        DashboardPurchasesItemComponent,
        DashboardPurchasesItemCheckComponent,
        DashboardPosSelectComponent
    ],
    providers: [
        PosService,
        NewsService,
        LoyaltyRulesService,
        TransactionService,
        StatisticService,
        BonusesService,
        CoinsService
    ]
})
export class DashboardModule {
}
