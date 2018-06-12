import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-online-payments',
    templateUrl: './online-payments.component.html',
    styles: []
})
export class OnlinePaymentsComponent implements OnInit {

    constructor(private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.payments);
        TitleService.setTitle(WINDOW_TITLE.payments);
    }

    ngOnInit() {
    }

}
