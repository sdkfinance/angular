import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {RouterModule} from '@angular/router';
import {INVOICES_ROUTES} from './invoices.routing';
import {InvoicesTableComponent} from './components/invoices-table/invoices-table.component';
import {InvoicesService} from '../../_services/invoices.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InvoiceBillComponent} from './components/invoice-bill/invoice-bill.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {PayInvoiceComponent} from './components/pay-invoice/pay-invoice.component';
import {CoinsService} from '../../_services/coins.service';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {CreateHoldComponent} from './components/create-hold/create-hold.component';
import {CardService} from '../../_services/card.service';
import {GatesService} from '../../_services/gates.service';
import { CreateHoldFormComponent } from './components/create-hold-form/create-hold-form.component';
import {CardHoldsService} from '../../_services/card-holds.service';
import {InfoDialogComponent} from '../../_modules/ui/components/info-dialog/info-dialog.component';
import { CardHoldsComponent } from './components/card-holds/card-holds.component';
import { CardHoldItemComponent } from './components/card-hold-item/card-hold-item.component';
import { CreateHoldResultComponent } from './components/create-hold-result/create-hold-result.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(INVOICES_ROUTES),
        UiModule,
        MatDialogModule,
        MatSnackBarModule,
        I18nPipeModule
    ],
    declarations: [
        InvoicesComponent,
        InvoicesTableComponent,
        InvoiceBillComponent,
        PayInvoiceComponent,
        InvoiceComponent,
        CreateHoldComponent,
        CreateHoldFormComponent,
        CardHoldsComponent,
        CardHoldItemComponent,
        CreateHoldResultComponent
    ],
    providers: [InvoicesService, CoinsService, SnackBarService, CardService, GatesService, CardHoldsService],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent, InfoDialogComponent]
})
export class InvoicesModule {
}
