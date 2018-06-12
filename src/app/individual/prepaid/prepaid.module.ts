import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrepaidComponent} from './components/prepaid/prepaid.component';
import {PREPAID_ROUTES} from './prepaid.routing';
import {VouchersTableComponent} from './components/vouchers-table/vouchers-table.component';
import {VoucherRedeemComponent} from './components/voucher-redeem/voucher-redeem.component';
import {VoucherCreateComponent} from './components/voucher-create/voucher-create.component';
import {PrepaidService} from '../../_services/prepaid.service';
import {CoinsService} from '../../_services/coins.service';
import {VoucherCreateFormComponent} from './components/voucher-create-form/voucher-create-form.component';
import {VoucherCreateResultComponent} from './components/voucher-create-result/voucher-create-result.component';
import {VoucherRedeemAmountComponent} from './components/voucher-redeem-amount/voucher-redeem-amount.component';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {UiModule} from '../../_modules/ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule.forChild(PREPAID_ROUTES),
        I18nPipeModule,
        UiModule
    ],
    declarations: [
        PrepaidComponent,
        VouchersTableComponent,
        VoucherRedeemComponent,
        VoucherCreateComponent,
        VoucherCreateFormComponent,
        VoucherCreateResultComponent,
        VoucherRedeemAmountComponent
    ],
    providers: [PrepaidService, CoinsService]
})
export class PrepaidModule {
}
