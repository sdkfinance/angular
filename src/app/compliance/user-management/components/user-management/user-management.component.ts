import {Component, OnDestroy, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';
import {UserManagementService} from '../../services/user-management.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styles: []
})
export class UserManagementComponent implements OnInit, OnDestroy {

    constructor(private title: Title, private managementService: UserManagementService) {
        this.title.setTitle(PAGE_TITLES.userManagement);
        TitleService.setTitle(WINDOW_TITLE.userManagement);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.managementService.filtersStorage = null;
    }

}
