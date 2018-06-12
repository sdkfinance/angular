import {Routes} from '@angular/router';
import {SystemOperationsComponent} from './components/system-operations/system-operations.component';

export const SYSTEM_OPERATIONS_ROUTES: Routes = [
    {path: '', component: SystemOperationsComponent},
    {path: '**', redirectTo: ''}
];
