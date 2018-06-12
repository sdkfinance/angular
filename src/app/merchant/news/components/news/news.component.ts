import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {Title} from "@angular/platform-browser";
import {TitleService} from "../../../../_services/title.service";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styles: []
})
export class NewsComponent implements OnInit {

    constructor(private titleService: Title ) {
        this.titleService.setTitle(PAGE_TITLES.news);
        TitleService.setTitle(WINDOW_TITLE.news);
    }

    ngOnInit() {
    }
}
