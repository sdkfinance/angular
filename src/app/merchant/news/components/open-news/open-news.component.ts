import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../../../_services/news.service";
import {Location} from '@angular/common';
import {Title} from "@angular/platform-browser";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";

@Component({
    selector: 'app-open-news',
    templateUrl: './open-news.component.html',
    styles: []
})
export class OpenNewsComponent implements OnInit, OnDestroy {
    newsId: string;
    newsName: string;
    messageOfNews = null;
    textOfNews: string[];
    picturesOfNews: any[];
    bigTag = 'big';
    bigPictureUrl: string;
    private sub: any;

    constructor(private route: ActivatedRoute, private newsService: NewsService, private location: Location, private titleService: Title ) {
        TitleService.setTitle(WINDOW_TITLE.news);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.newsId = params['id'];
            this.newsName = params['title'];
            this.titleService.setTitle("Loyalty - " + this.newsName);
            this.getFirstMessageOfNewsFromHttp();
        });
    }


    getFirstMessageOfNewsFromHttp() {
        let body = {
            sort: {
                date: 'asc'
            },
            pageNumber: 0,
            pageSize: 1
        };

        this.newsService.getMessageFromNewsConversation(this.newsId, body)
            .then((response: any) => {
                this.textOfNews = response.records[0].text.split('\n');
                this.messageOfNews = response.records[0];
                this.getBigPictureOfNews();
            })
            .catch(error => console.log(error));
    }

    getBigPictureOfNews() {
        this.newsService.getPicturesUrlFromNewsConversation(this.newsId, this.messageOfNews.id)
            .then((response: any) => {
                this.picturesOfNews = response.records;
                this.bigPictureUrl = this.picturesOfNews[0].url; // this.findPictureUrlByTag(this.bigTag);
            })
            .catch(error => console.log(error));
    }

    findPictureUrlByTag(tag: string) {
        for (let picture of this.picturesOfNews) {
            if (picture.tag == tag) return picture.url;
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onBack() {
        this.location.back();
    }

}
