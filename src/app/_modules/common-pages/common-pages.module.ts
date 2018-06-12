import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {RouterModule} from '@angular/router';
import {COMMON_PAGES_ROUTING} from './common-pages.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(COMMON_PAGES_ROUTING)
    ],
    declarations: [TermsAndConditionsComponent]
})
export class CommonPagesModule {
}
