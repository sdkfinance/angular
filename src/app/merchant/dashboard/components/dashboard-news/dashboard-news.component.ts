import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../../../_services/news.service";
import {News} from "../../../../_classes/news";

@Component({
    selector: 'app-dashboard-news',
    templateUrl: './dashboard-news.component.html',
    styles: []
})
export class DashboardNewsComponent implements OnInit {
    newsList: News[] = null;
    totalRecords: number;

    constructor(private newsService: NewsService) {
    }

    ngOnInit() {
        this.getNewsListFromHttp();
    }

    getNewsListFromHttp() {
        let requestBody = {
            filter: {
                initiatorType: "SYSTEM"
            },
            sort: {
                //"date": "asc",
                lastMessageDate: "desc"
                //"unread": "asc"
            },
            pageNumber: 0,
            pageSize: 3
        };
        this.newsService.getNewsList(requestBody)
            .then((newsRes: any) => {
                this.newsList = newsRes.records;
                this.totalRecords = newsRes.totalRecords;
            })
            .catch(error => console.log(error));
    }
}
