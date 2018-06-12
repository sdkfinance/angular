import {Component, OnInit} from '@angular/core';
import {News} from "../../../../_classes/news";
import {NewsService} from "../../../../_services/news.service";

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styles: []
})
export class NewsTableComponent implements OnInit {
    newsList: News[] = null;
    totalPages: number;
    currentPage: number;
    pageSize: number = 10;
    totalRecords: number;
    pageNumber: number = 0;

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
                // date": "asc",
                lastMessageDate: "desc"
                //"unread": "asc"
            },
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
        };
        this.newsService.getNewsList(requestBody)
            .then((newsRes: any) => {
                this.newsList = newsRes.records;
                this.totalRecords = newsRes.totalRecords;
                this.totalPages = (<any>newsRes).totalPages;
                this.currentPage = (<any>newsRes).pageNumber;
            })
            .catch(error => console.log(error));
    }

    onNextPage() {
        this.pageNumber = this.currentPage + 1;
        this.getNewsListFromHttp();
    }

    onPreviousPage() {
        this.pageNumber = this.currentPage - 1;
        this.getNewsListFromHttp();
    }

}
