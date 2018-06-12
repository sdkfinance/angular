import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styles: []
})
export class MonitoringComponent implements OnInit {

    constructor(private title: Title) {
        this.title.setTitle(PAGE_TITLES.monitoring);
        TitleService.setTitle(WINDOW_TITLE.monitoring);
    }

    ngOnInit() {
    }

}
