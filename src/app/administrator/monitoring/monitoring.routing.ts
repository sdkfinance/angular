import {Routes} from '@angular/router';
import {MonitoringComponent} from './components/monitoring/monitoring.component';

export const MONITORING_ROUTES: Routes = [
    {path: '', component: MonitoringComponent},
    {path: '**', redirectTo: ''}
];
