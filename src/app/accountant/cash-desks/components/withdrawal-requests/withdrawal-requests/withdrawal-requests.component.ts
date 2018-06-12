import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../../app.constants';

@Component({
    selector: 'app-withdrawal-requests',
    templateUrl: './withdrawal-requests.component.html',
    styleUrls: ['./withdrawal-requests.component.less']
})
export class WithdrawalRequestsComponent implements OnInit {

    cashDeskId: string;

    constructor(private route: ActivatedRoute, private title: Title) {
        this.title.setTitle(PAGE_TITLES.cashDesks);
        TitleService.setTitle(WINDOW_TITLE.cashDesks);
    }

    ngOnInit() {
        this.cashDeskId = this.route.snapshot.params['id'];
    }

}
