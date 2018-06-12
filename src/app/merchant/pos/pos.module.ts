import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PosComponent} from './components/pos/pos.component';
import {PosTableComponent} from './components/pos-table/pos-table.component';
import {PosActionsComponent} from './components/pos-actions/pos-actions.component';
import {POS_ROUTES} from './pos.routes';
import {HTTP_INTERCEPTOR} from '../../_services/interceptors/http-interceptor';
import {PosService} from '../../_services/pos.service';
import {RouterModule} from '@angular/router';
import {ZerobeforePipe} from '../../_pipes/zerobefore.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PosInfoComponent} from './components/pos-info/pos-info.component';
import {PosInfoTableComponent} from './components/pos-info-table/pos-info-table.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {CreatePosComponent} from './components/create-pos/create-pos.component';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(POS_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        MatDialogModule,
        MatSnackBarModule,
        I18nPipeModule
    ],
    declarations: [
        PosComponent,
        PosTableComponent,
        PosActionsComponent,
        ZerobeforePipe,
        PosInfoComponent,
        PosInfoTableComponent,
        CreatePosComponent
    ],
    providers: [HTTP_INTERCEPTOR, PosService, SnackBarService],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent]
})
export class PosModule {
}
