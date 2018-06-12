import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-system-operations',
    templateUrl: './system-operations.component.html',
    styleUrls: ['./system-operations.component.less']
})
export class SystemOperationsComponent implements OnInit {

    /**
     * System operation details
     */
    operation;

    constructor(private titleService: Title) {
        TitleService.setTitle(WINDOW_TITLE.systemOperations);
        this.titleService.setTitle(PAGE_TITLES.systemOperations);
    }

    ngOnInit() {
    }

    /**
     * Sets the system operation
     * @param operation
     */
    setOperation(operation) {
        this.operation = operation;
    }

}
