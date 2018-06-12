import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSaverComponent} from './table-saver/table-saver.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TableSaverComponent],
    exports: [TableSaverComponent]
})
export class FileSaverModule {
}
