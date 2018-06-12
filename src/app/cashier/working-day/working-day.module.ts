import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkingDayComponent} from './components/working-day/working-day.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {RouterModule} from '@angular/router';
import {WORKING_DAY_ROUTES} from './working-day.routing';
import {WorkingDaysService} from '../../_services/working-days.service';
import {TopUpWalletComponent} from './components/top-up/top-up-wallet/top-up-wallet.component';
import {TopUpFormComponent} from './components/top-up/top-up-form/top-up-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CashDesksService} from '../../_services/cash-desks.service';
import {SystemOperationsComponent} from './components/system-operations/system-operations.component';
import {SystemOperationsFormComponent} from './components/system-operations-form/system-operations-form.component';
import {CashCollectsService} from '../../_services/cash-collects.service';
import {CashInputsService} from '../../_services/cash-inputs.service';
import {InvestmentService} from '../../_services/investment.service';
import {CashOperationDetailsComponent} from './components/cash-operation-details/cash-operation-details.component';
import {TopUpUserComponent} from './components/top-up/top-up-user/top-up-user.component';
import {TopUpAmountComponent} from './components/top-up/top-up-amount/top-up-amount.component';
import {ContactValidationService} from '../../_services/contact-validation.service';
import {OrganizationsService} from '../../_services/organizations.service';
import {CashDeskTopUpService} from '../../_services/cash-desk-top-up.service';
import {CashDeskWithdrawalService} from '../../_services/cash-desk-withdrawal.service';
import {TopUpResultComponent} from './components/top-up/top-up-result/top-up-result.component';
import {WithdrawalComponent} from './components/withdrawal/withdrawal/withdrawal.component';
import { WithdrawalFormComponent } from './components/withdrawal/withdrawal-form/withdrawal-form.component';
import { WithdrawalNumberComponent } from './components/withdrawal/withdrawal-number/withdrawal-number.component';
import { WithdrawalDetailsComponent } from './components/withdrawal/withdrawal-details/withdrawal-details.component';
import { WithdrawalResultComponent } from './components/withdrawal/withdrawal-result/withdrawal-result.component';

@NgModule({
    imports: [
        RouterModule.forChild(WORKING_DAY_ROUTES),
        ReactiveFormsModule,
        I18nPipeModule,
        CommonModule,
        FormsModule,
        UiModule
    ],
    declarations: [
        SystemOperationsFormComponent,
        CashOperationDetailsComponent,
        SystemOperationsComponent,
        TopUpWalletComponent,
        WorkingDayComponent,
        TopUpFormComponent,
        TopUpUserComponent,
        TopUpAmountComponent,
        TopUpResultComponent,
        WithdrawalComponent,
        WithdrawalFormComponent,
        WithdrawalNumberComponent,
        WithdrawalDetailsComponent,
        WithdrawalResultComponent
    ],
    providers: [
        CashCollectsService,
        WorkingDaysService,
        CashInputsService,
        InvestmentService,
        CashDesksService,
        ContactValidationService,
        OrganizationsService,
        CashDeskTopUpService,
        CashDeskWithdrawalService
    ]
})
export class WorkingDayModule {
}
