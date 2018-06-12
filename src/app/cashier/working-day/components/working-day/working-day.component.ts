import {Component, OnInit} from '@angular/core';
import {WorkingDaysService} from '../../../../_services/working-days.service';
import {WorkingDay} from '../../../../_interfaces/working-day';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-working-day',
    templateUrl: './working-day.component.html',
    styleUrls: ['./working-day.component.less']
})
export class WorkingDayComponent implements OnInit {

    /** The current cash desk working day */
    currentWorkingDay: WorkingDay;
    /** True if the cash desk day is pending for accepting of closing */
    dayIsPending: boolean = false;
    /** True if there is no cash desk day */
    noOpenDay: boolean = false;

    waiting: boolean = false;

    constructor(private workingDaysService: WorkingDaysService, private titleService: Title) {
        TitleService.setTitle(WINDOW_TITLE.cashBoxDay);
        this.titleService.setTitle(PAGE_TITLES.cashBoxDay);
    }

    ngOnInit() {
        this.getCurrentDay();
    }

    /**
     * Makes a request to get the current cash desk day
     */
    getCurrentDay() {
        this.workingDaysService.getCurrentWorkingDay().then(data => {
            this.currentWorkingDay = data.workingDay;
        }).catch(error => {
            error = error.error;
            if (error.code === 'NOT_ACCEPTED_OR_NOT_TODAY_OPENED_WORKING_DAY') {
                this.dayIsPending = true;
            } else if (error.code === 'WORKING_DAY_NOT_EXISTS') {
                this.noOpenDay = true;
            }
        });
    }

    /**
     * Makes a request to close the cash desk day
     */
    closeDay() {
        this.waiting = true;
        this.workingDaysService.closeWorkingDay().then(data => {
            this.currentWorkingDay = data.workingDay;
            this.waiting = false;
            this.noOpenDay = false;
            this.dayIsPending = false;
        }).catch(() => this.waiting = false);
    }

    /**
     * Makes a request to open the cash desk day
     */
    openDay() {
        this.waiting = true;
        this.workingDaysService.openWorkingDay().then(data => {
            this.currentWorkingDay = data.workingDay;
            this.waiting = false;
            this.noOpenDay = false;
            this.dayIsPending = false;
        }).catch(() => this.waiting = false);
    }

}
