import {Routes} from '@angular/router';
import {BundleConfiguratorComponent} from './components/bundle-configurator/bundle-configurator.component';
import {BundleConfiguratorEditComponent} from './components/bundle-configurator-edit/bundle-configurator-edit.component';

export const BUNDLE_ROUTES: Routes = [
    {path: '', component: BundleConfiguratorComponent},
    {path: ':id', component: BundleConfiguratorEditComponent},
    {path: '**', redirectTo: ''}
];
