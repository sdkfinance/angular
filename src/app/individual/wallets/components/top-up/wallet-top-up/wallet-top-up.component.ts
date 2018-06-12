import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../../app.constants';
import {TitleService} from '../../../../../_services/title.service';
import {Title} from '@angular/platform-browser';
import {GatesService} from '../../../../../_services/gates.service';
import {TopUpService} from '../../../services/top-up.service';
import {PaymentProvider} from '../../../../../_interfaces/payment-provider';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-wallet-top-up',
    templateUrl: './wallet-top-up.component.html',
    styleUrls: ['./wallet-top-up.component.less']
})
export class WalletTopUpComponent implements OnInit, OnDestroy {
    /** Serial number of the coin to top up */
    serial;
    /** List of top up providers */
    providers: PaymentProvider[];
    /** List of subscriptions */
    subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute,
                private gatesService: GatesService,
                private title: Title,
                private topUpService: TopUpService) {
        this.title.setTitle(PAGE_TITLES.topUp);
        TitleService.setTitle(WINDOW_TITLE.topUp);
    }

    /**
     * Makes a request to get list of top up providers
     */
    ngOnInit() {
        this.serial = this.route.snapshot.params['serial'];
        this.subscriptions.push(this.topUpService.getProvidersSubject(this.serial).subscribe(data => {
            this.providers = data;
        }));
    }

    /**
     * Unsubscribe from all subscriptions
     */
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
