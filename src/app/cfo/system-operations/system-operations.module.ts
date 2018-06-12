import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemOperationsComponent} from './components/system-operations/system-operations.component';
import {RouterModule} from '@angular/router';
import {SYSTEM_OPERATIONS_ROUTES} from './system-operations.routing';
import {WorkingDayModule} from '../../cashier/working-day/working-day.module';
import {UiModule} from '../../_modules/ui/ui.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {InvestmentService} from '../../_services/investment.service';
import {CashDeskWithdrawalService} from '../../_services/cash-desk-withdrawal.service';
import {CashInputsService} from '../../_services/cash-inputs.service';
import {CashDeskTopUpService} from '../../_services/cash-desk-top-up.service';
import {WorkingDaysService} from '../../_services/working-days.service';
import {CashDesksService} from '../../_services/cash-desks.service';
import {OrganizationsService} from '../../_services/organizations.service';
import {CashCollectsService} from '../../_services/cash-collects.service';
import {ContactValidationService} from '../../_services/contact-validation.service';
import {CashOperationDetailsComponent} from './components/cash-operation-details/cash-operation-details.component';
import {SystemOperationsFormComponent} from './components/system-operations-form/system-operations-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GateInvestmentService} from '../../_services/gate-investment.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SYSTEM_OPERATIONS_ROUTES),
        UiModule,
        I18nPipeModule,
        ReactiveFormsModule

    ],
    declarations: [
        SystemOperationsComponent,
        CashOperationDetailsComponent,
        SystemOperationsFormComponent
    ],
    providers: [
        GateInvestmentService
    ]
})
export class SystemOperationsModule {
}
