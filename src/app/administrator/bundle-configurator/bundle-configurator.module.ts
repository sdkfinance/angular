import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BundleConfiguratorComponent} from './components/bundle-configurator/bundle-configurator.component';
import {BundleConfiguratorTableComponent} from './components/bundle-configurator-table/bundle-configurator-table.component';
import {BundleConfiguratorItemComponent} from './components/bundle-configurator-item/bundle-configurator-item.component';
import {BundleConfiguratorEditComponent} from './components/bundle-configurator-edit/bundle-configurator-edit.component';
import {BundleConfiguratorCreateComponent} from './components/bundle-configurator-create/bundle-configurator-create.component';
import {BundleConfiguratorService} from '../../_services/bundle-configurator.service';
import {RouterModule} from '@angular/router';
import {BUNDLE_ROUTES} from './bundle-configurator.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {ConfirmDeleteComponent} from '../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {UiModule} from '../../_modules/ui/ui.module';
import {I18nPipeModule} from '../../_modules/i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BUNDLE_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        MatDialogModule,
        MatSnackBarModule,
        I18nPipeModule
    ],
    declarations: [
        BundleConfiguratorComponent,
        BundleConfiguratorTableComponent,
        BundleConfiguratorItemComponent,
        BundleConfiguratorEditComponent,
        BundleConfiguratorCreateComponent
    ],
    providers: [
        BundleConfiguratorService,
        SnackBarService
    ],
    entryComponents: [ConfirmDeleteComponent, SnackBarComponent]
})
export class BundleConfiguratorModule {
}
