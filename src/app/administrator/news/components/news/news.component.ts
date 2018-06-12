import { Component, OnInit } from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {NewsService} from '../../../../_services/news.service';
import {Title} from '@angular/platform-browser';
import {News} from '../../../../_classes/news';
import {TitleService} from '../../../../_services/title.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styles: []
})
export class NewsComponent implements OnInit {

    newsList: News[] = null;
    totalRecords: number;

    constructor(private newsService: NewsService, private titleService: Title ) {
        this.titleService.setTitle(PAGE_TITLES.news);
        TitleService.setTitle(WINDOW_TITLE.news);
    }

    ngOnInit() {
        this.getNewsListFromHttp();
    }

    getNewsListFromHttp() {
        const requestBody = {
            filter: {
                initiatorType: 'SYSTEM'
            }
        };
        this.newsService.getNewsList(requestBody)
            .then((newsRes: any) => {
                this.newsList = newsRes.records;
                this.totalRecords = newsRes.totalRecords;
            })
            .catch(error => console.log(error));
    }
}
