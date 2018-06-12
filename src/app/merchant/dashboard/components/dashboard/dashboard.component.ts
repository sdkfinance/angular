import {Component, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {TitleService} from "../../../../_services/title.service";
import {StatisticService} from "../../../../_services/statistic.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    constructor(private title: Title, private statisticService: StatisticService) {
        this.title.setTitle(PAGE_TITLES.dashboard);
        TitleService.setTitle(WINDOW_TITLE.dashboard);

        this.statisticService.calcBonuses().then(data => console.log(data));
    }

    ngOnInit() {
    }

    calc(data){
        let indentArray: any = [];
    }

}
