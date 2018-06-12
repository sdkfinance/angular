import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-bundle-configurator',
    templateUrl: './bundle-configurator.component.html',
    styles: []
})
export class BundleConfiguratorComponent implements OnInit {

    constructor(private titleService: Title) {
        TitleService.setTitle(WINDOW_TITLE.i18n);
        this.titleService.setTitle(PAGE_TITLES.i18n);
    }

    ngOnInit() {
    }

}
