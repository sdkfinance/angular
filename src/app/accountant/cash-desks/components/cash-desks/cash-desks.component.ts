import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';

@Component({
    selector: 'app-cash-desks',
    templateUrl: './cash-desks.component.html',
    styleUrls: ['./cash-desks.component.less']
})
export class CashDesksComponent implements OnInit {

    constructor(private title: Title) {
        this.title.setTitle(PAGE_TITLES.cashDesks);
        TitleService.setTitle(WINDOW_TITLE.cashDesks);
    }

    ngOnInit() {
    }

}
