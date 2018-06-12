import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-loyalty-groups',
    templateUrl: './loyalty-groups.component.html',
    styles: []
})
export class LoyaltyGroupsComponent implements OnInit {

    constructor(private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.loyaltyGroups);
        TitleService.setTitle(WINDOW_TITLE.loyaltyGroups);
    }

    ngOnInit() {
    }

}
