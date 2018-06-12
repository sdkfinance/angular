import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {WALLETS_ROUTING} from './wallets.routing';
import {WalletsComponent} from './components/wallets/wallets.component';
import {WalletComponent} from './components/wallet/wallet.component';
import {CoinsService} from '../../_services/coins.service';
import {MatSnackBarModule} from '@angular/material';
import {UiModule} from '../../_modules/ui/ui.module';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {WalletCreateComponent} from './components/wallet-create/wallet-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IssuersService} from '../../_services/issuers.service';
import {WalletTopUpComponent} from './components/top-up/wallet-top-up/wallet-top-up.component';
import {TopUpAmountComponent} from './components/top-up/top-up-amount/top-up-amount.component';
import {TopUpFormComponent} from './components/top-up/top-up-form/top-up-form.component';
import {TopUpResultComponent} from './components/top-up/top-up-result/top-up-result.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {PaymentModule} from '../../_modules/payment/payment.module';
import {TopUpComponent} from './components/top-up/top-up/top-up.component';
import {GatesService} from '../../_services/gates.service';
import {TopUpService} from './services/top-up.service';
import {PaymentMethodsModule} from '../../_modules/payment-methods/payment-methods.module';
import {InfoDialogComponent} from '../../_modules/ui/components/info-dialog/info-dialog.component';
import {FormSubmittingService} from '../../_services/form-submitting.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WALLETS_ROUTING),
        UiModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        I18nPipeModule,
        PaymentModule,
        PaymentMethodsModule
    ],
    declarations: [
        WalletsComponent,
        WalletComponent,
        WalletCreateComponent,
        WalletTopUpComponent,
        TopUpAmountComponent,
        TopUpFormComponent,
        TopUpResultComponent,
        TopUpComponent
    ],
    providers: [CoinsService, SnackBarService, IssuersService, GatesService, TopUpService, FormSubmittingService],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent, InfoDialogComponent]
})
export class WalletsModule {
}
