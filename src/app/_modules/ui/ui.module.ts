import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDeleteComponent} from './components/confirm-delete/confirm-delete.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {PaginationItemComponent} from './components/pagination/components/pagination-item/pagination-item.component';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {ClientsStatisticGraphComponent} from './components/clients-statistic-graph/clients-statistic-graph.component';
import {ChartModule} from 'angular2-chartjs';
import {StatisticService} from '../../_services/statistic.service';
import {LineStatisticGraphComponent} from './components/line-statistic-graph/line-statistic-graph.component';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {FirstIsUpperPipe} from '../../_pipes/first-is-upper.pipe';
import {PaginationButtonsComponent} from './components/pagination-buttons/pagination-buttons.component';
import {ListFilterComponent} from './components/list-filter/list-filter.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatSnackBarModule, MatSnackBar} from '@angular/material';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {DocumentStatusPipe} from '../../_pipes/document-status.pipe';
import {ProfileStatusPipe} from '../../_pipes/profile-status.pipe';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {InButtonLoaderDirective} from '../../_directives/in-button-loader.directive';
import {I18nPipeModule} from '../i18n-pipe/i18n-pipe.module';
import {PaymentOptionsPipe} from '../../_pipes/payment-options.pipe';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
        MatDialogModule,
        Ng2GoogleChartsModule,
        FormsModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterModule,
        I18nPipeModule
    ],
    declarations: [
        ConfirmDeleteComponent,
        PaginationComponent,
        PaginationItemComponent,
        SnackBarComponent,
        ClientsStatisticGraphComponent,
        LineStatisticGraphComponent,
        FirstIsUpperPipe,
        DocumentStatusPipe,
        ProfileStatusPipe,
        PaymentOptionsPipe,
        PaginationButtonsComponent,
        ListFilterComponent,
        SearchBoxComponent,
        InfoDialogComponent,
        FooterComponent,
        InButtonLoaderDirective
    ],
    exports: [
        ConfirmDeleteComponent,
        PaginationComponent,
        ClientsStatisticGraphComponent,
        LineStatisticGraphComponent,
        FirstIsUpperPipe,
        DocumentStatusPipe,
        ProfileStatusPipe,
        PaymentOptionsPipe,
        PaginationButtonsComponent,
        ListFilterComponent,
        SearchBoxComponent,
        InfoDialogComponent,
        FooterComponent,
        InButtonLoaderDirective
    ],
    entryComponents: [
        // ModalDeleteComponent
    ],
    providers: [SnackBarService, StatisticService]
})
export class UiModule {
}
