import {Routes} from '@angular/router';
import {WalletsComponent} from './components/wallets/wallets.component';
import {WalletTopUpComponent} from './components/top-up/wallet-top-up/wallet-top-up.component';
import {TopUpComponent} from './components/top-up/top-up/top-up.component';

export const WALLETS_ROUTING: Routes = [
    {path: '', component: WalletsComponent},
    {path: 'top-up/:serial', component: WalletTopUpComponent},
    {path: 'top-up/:serial/:way/:id', component: TopUpComponent},
    {path: '**', redirectTo: ''}
];
