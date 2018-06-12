import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../../_services/title.service';

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: ['./withdrawal.component.less']
})
export class WithdrawalComponent implements OnInit {

    constructor(private titleService: Title) {
        TitleService.setTitle(WINDOW_TITLE.cashDeskWithdrawal);
        this.titleService.setTitle(PAGE_TITLES.cashDeskWithdrawal);
    }

    ngOnInit() {
    }

}
