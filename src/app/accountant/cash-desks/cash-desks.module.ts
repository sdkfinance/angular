import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashDesksComponent} from './components/cash-desks/cash-desks.component';
import {RouterModule} from '@angular/router';
import {CASH_DESKS_ROUTES} from './cash-desks.routing';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {CashDesksTableComponent} from './components/cash-desks-table/cash-desks-table.component';
import {CashDesksItemComponent} from './components/cash-desks-item/cash-desks-item.component';
import {OrganizationsService} from '../../_services/organizations.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {WithdrawalRequestsComponent} from './components/withdrawal-requests/withdrawal-requests/withdrawal-requests.component';
import {WithdrawalRequestsTableComponent} from './components/withdrawal-requests/withdrawal-requests-table/withdrawal-requests-table.component';
import {WithdrawalRequestsItemComponent} from './components/withdrawal-requests/withdrawal-requests-item/withdrawal-requests-item.component';
import {CashDeskWithdrawalService} from '../../_services/cash-desk-withdrawal.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CASH_DESKS_ROUTES),
        I18nPipeModule,
        UiModule
    ],
    declarations: [
        CashDesksComponent,
        CashDesksTableComponent,
        CashDesksItemComponent,
        WithdrawalRequestsComponent,
        WithdrawalRequestsTableComponent,
        WithdrawalRequestsItemComponent
    ],
    providers: [OrganizationsService, CashDeskWithdrawalService]
})
export class CashDesksModule {
}
