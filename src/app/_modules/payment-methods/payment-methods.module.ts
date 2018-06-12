import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseFormComponent} from './components/base-form/base-form.component';
import {I18nPipeModule} from '../i18n-pipe/i18n-pipe.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaymentModule} from '../payment/payment.module';
import {PaymentMethodsService} from './services/payment-methods.service';
import {InfoDialogComponent} from '../ui/components/info-dialog/info-dialog.component';
import {TransactionStateComponent} from './components/transaction-state/transaction-state.component';
import {RouterModule} from '@angular/router';
import {AuthorizationService} from '../../_services/authorization.service';
import {UiModule} from '../ui/ui.module';
import { ExistingCardComponent } from './components/existing-card/existing-card.component';
import {CardService} from '../../_services/card.service';
import {NewPaymentCardComponent} from './components/new-payment-card/new-payment-card.component';

@NgModule({
    imports: [
        CommonModule,
        I18nPipeModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentModule,
        RouterModule,
        UiModule
    ],
    declarations: [
        TransactionStateComponent,
        NewPaymentCardComponent,
        ExistingCardComponent,
        BaseFormComponent
    ],
    exports: [
        TransactionStateComponent,
        NewPaymentCardComponent,
        ExistingCardComponent,
        BaseFormComponent
    ],
    providers: [
        PaymentMethodsService,
        CardService
    ],
    entryComponents: [InfoDialogComponent]
})
export class PaymentMethodsModule {
}
