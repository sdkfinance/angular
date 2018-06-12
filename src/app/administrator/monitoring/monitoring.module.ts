import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoringComponent} from './components/monitoring/monitoring.component';
import {RouterModule} from "@angular/router";
import {MONITORING_ROUTES} from "./monitoring.routing";

@NgModule({
    imports: [
        RouterModule.forChild(MONITORING_ROUTES),
        CommonModule
    ],
    declarations: [MonitoringComponent]
})
export class MonitoringModule {
}
