import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from "../../../../_services/news.service";
import {News} from "../../../../_classes/news";

@Component({
    selector: 'app-dashboard-news-item',
    templateUrl: './dashboard-news-item.component.html',
    styles: []
})
export class DashboardNewsItemComponent implements OnInit {
    @Input() newsItem: News;
    messageOfNews;
    picturesOfNews: any[];
    smallTag = 'small';
    smallPictureUrl: string;

    constructor(private newsService: NewsService) {
    }

    ngOnInit() {
        this.getFirstMessageOfNewsFromHttp();
    }

    getFirstMessageOfNewsFromHttp() {
        let body = {
            sort: {
                date: 'asc'
            },
            pageNumber: 0,
            pageSize: 1
        };

        this.newsService.getMessageFromNewsConversation(this.newsItem.id, body)
            .then((response: any) => {
                this.messageOfNews = response.records[0];
                this.getSmallPictureOfNews();
            })
            .catch(error => console.log(error));
    }

    getSmallPictureOfNews() {
        this.newsService.getPicturesUrlFromNewsConversation(this.newsItem.id, this.messageOfNews.id)
            .then((response: any) => {
                this.picturesOfNews = response.records;
                this.smallPictureUrl = this.picturesOfNews[0].url; //this.findPictureUrlByTag(this.smallTag);

            })
            .catch(error => console.log(error));
    }

    findPictureUrlByTag(tag: string) {
        for (let picture of this.picturesOfNews) {
            if (picture.tag == tag) return picture.url;
        }
    }

    countDaysDiff(dateStr) {
        let _MS_PER_DAY = 1000 * 60 * 60 * 24;
        let today = new Date();
        let date = new Date(dateStr);
        //let timeDiff = Math.abs(today.getTime() - (new Date(date)).getTime());
        //let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
        let utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        let utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        let diffDays = Math.floor((utc1 - utc2) / _MS_PER_DAY);
        if (diffDays == 0) return 'Today';
        else if (diffDays == 1) return 'Yesterday';
        else return (diffDays) + ' days ago';
    }
}
