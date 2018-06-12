import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ONLINE_PAYMENTS_ROUTES} from './online-payments.routing';
import {OnlinePaymentsComponent} from './components/online-payments/online-payments.component';
import {OnlinePaymentsListComponent} from './components/online-payments-list/online-payments-list.component';
import {OnlinePaymentsCategoriesComponent} from './components/online-payments-categories/online-payments-categories.component';
import {OnlinePaymentsService} from '../../_services/online-payments.service';
import {UiModule} from '../../_modules/ui/ui.module';
import {OnlinePaymentsPayComponent} from './components/online-payments-pay/online-payments-pay.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoinsService} from '../../_services/coins.service';
import {OnlinePaymentsFieldsComponent} from './components/online-payments-fields/online-payments-fields.component';
import {OnlinePaymentsAmountComponent} from './components/online-payments-amount/online-payments-amount.component';
import {OnlinePaymentsResultComponent} from './components/online-payments-result/online-payments-result.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ONLINE_PAYMENTS_ROUTES),
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        I18nPipeModule
    ],
    declarations: [
        OnlinePaymentsComponent,
        OnlinePaymentsListComponent,
        OnlinePaymentsCategoriesComponent,
        OnlinePaymentsPayComponent,
        OnlinePaymentsFieldsComponent,
        OnlinePaymentsAmountComponent,
        OnlinePaymentsResultComponent
    ],
    providers: [OnlinePaymentsService, CoinsService]
})
export class OnlinePaymentsModule {
}
