import {Routes} from '@angular/router';
import {ClientsComponent} from "./components/clients/clients.component";
import {ClientDetailsComponent} from "./components/client-details/client-details.component";

export const CLIENTS_ROUTES: Routes = [
    {path: '', component: ClientsComponent},
    {path: ':id', component: ClientDetailsComponent},
    {path: '**', redirectTo: ''}
];
