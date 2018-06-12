import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-issuers',
    templateUrl: './issuers.component.html',
    styles: []
})
export class IssuersComponent implements OnInit {

    constructor(private title: Title) {
        this.title.setTitle(PAGE_TITLES.issuers);
        TitleService.setTitle(WINDOW_TITLE.issuers);
    }

    ngOnInit() {
    }

}
