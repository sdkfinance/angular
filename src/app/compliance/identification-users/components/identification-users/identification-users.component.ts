import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {IdentificationUsersService} from "../../services/identification-users.service";

@Component({
    selector: 'app-identification-users',
    templateUrl: './identification-users.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class IdentificationUsersComponent implements OnInit, OnDestroy {

    constructor(private title: Title, private usersService: IdentificationUsersService) {
        this.title.setTitle(PAGE_TITLES.identificationUsers);
        TitleService.setTitle(WINDOW_TITLE.identificationUsers);
    }

    ngOnInit() {
        this.usersService.filtersStorage = null;
    }

    ngOnDestroy() {
        this.usersService.filtersStorage = null;
    }

}
