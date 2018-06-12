import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemOperationsComponent} from './components/system-operations/system-operations.component';
import {RouterModule} from '@angular/router';
import {SYSTEM_OPERATIONS_ROUTES} from './system-operations.routing';
import {OperationFormComponent} from './components/operation-form/operation-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrganizationsService} from '../../_services/organizations.service';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {UiModule} from '../../_modules/ui/ui.module';
import {InvestmentComponent} from './components/investment/investment.component';
import {CashCollectComponent} from './components/cash-collect/cash-collect.component';
import {CashInputComponent} from './components/cash-input/cash-input.component';
import {InvestmentService} from '../../_services/investment.service';
import {SystemOperationsService} from './services/system-operations.service';
import {CashCollectsService} from '../../_services/cash-collects.service';
import {CashInputsService} from '../../_services/cash-inputs.service';
import {GateInvestmentService} from '../../_services/gate-investment.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SYSTEM_OPERATIONS_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        I18nPipeModule,
        UiModule
    ],
    declarations: [
        SystemOperationsComponent,
        OperationFormComponent,
        InvestmentComponent,
        CashCollectComponent,
        CashInputComponent
    ],
    providers: [
        OrganizationsService,
        InvestmentService,
        CashCollectsService,
        CashInputsService,
        SystemOperationsService,
        GateInvestmentService
    ]
})
export class SystemOperationsModule {
}
