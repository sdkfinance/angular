import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../../app.constants';
import {TitleService} from '../../../../../_services/title.service';

@Component({
    selector: 'app-top-up-wallet',
    templateUrl: './top-up-wallet.component.html',
    styleUrls: ['./top-up-wallet.component.less']
})
export class TopUpWalletComponent implements OnInit {

    constructor(private titleService: Title) {
        TitleService.setTitle(WINDOW_TITLE.topUpWallet);
        this.titleService.setTitle(PAGE_TITLES.topUpWallet);
    }

    ngOnInit() {
    }

}
