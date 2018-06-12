import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../../app.constants';
import {TitleService} from '../../../../../_services/title.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-contract-management',
    templateUrl: './contract-management.component.html',
    styles: []
})
export class ContractManagementComponent implements OnInit {

    constructor(private title: Title) {
        this.title.setTitle(PAGE_TITLES.contracts);
        TitleService.setTitle(WINDOW_TITLE.contracts);
    }

    ngOnInit() {
    }

}
