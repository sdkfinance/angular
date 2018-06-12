import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

    constructor(private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.settings);
        TitleService.setTitle(WINDOW_TITLE.settings);
    }

    ngOnInit() {
    }

}
