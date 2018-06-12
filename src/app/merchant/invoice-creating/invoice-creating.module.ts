import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceCreatingComponent} from './components/invoice-creating/invoice-creating.component';
import {RouterModule} from '@angular/router';
import {INVOICE_CREATING_ROUTES} from './invoice-creating.routing';
import {InvoicesService} from '../../_services/invoices.service';
import {InvoiceTemplatesService} from '../../_services/invoice-templates.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {InvoiceFormComponent} from './components/invoice-form/invoice-form.component';
import {CoinsService} from '../../_services/coins.service';
import {CreatingResultComponent} from './components/creating-result/creating-result.component';
import {CardHoldsService} from '../../_services/card-holds.service';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';
import {UiModule} from '../../_modules/ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(INVOICE_CREATING_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        I18nPipeModule,
        UiModule
    ],
    declarations: [InvoiceCreatingComponent, InvoiceFormComponent, CreatingResultComponent],
    providers: [InvoicesService, InvoiceTemplatesService, CoinsService, CardHoldsService]
})
export class InvoiceCreatingModule {
}
