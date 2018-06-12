import {Routes} from "@angular/router";
import {IdentificationUsersComponent} from "./components/identification-users/identification-users.component";
import {UsersTableComponent} from "./components/users-table/users-table.component";
import {DocumentsTableComponent} from "./components/documents-table/documents-table.component";

export const IDENTIFICATION_USERS_ROUTES: Routes = [
    {
        path: '', component: IdentificationUsersComponent, children: [
        {path: '', component: UsersTableComponent},
        {path: 'documents/:id', component: DocumentsTableComponent}
    ]
    },
    {path: '**', redirectTo: ''}
];
