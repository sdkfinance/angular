import {Routes} from '@angular/router';
import {PosComponent} from './components/pos/pos.component';
import {PosInfoComponent} from "./components/pos-info/pos-info.component";

export const POS_ROUTES: Routes = [
    {path: '', component: PosComponent},
    {
        path: 'details/:id', component: PosInfoComponent
    }

]
