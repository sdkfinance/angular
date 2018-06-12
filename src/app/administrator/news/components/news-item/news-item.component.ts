import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../../../_classes/news';
import {NewsService} from '../../../../_services/news.service';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styles: []
})
export class AdminNewsItemComponent implements OnInit {
    @Input() newsItem: News;
    messageOfNews;
    picturesOfNews: any[];
    smallTag = 'small';
    smallPictureUrl: string;
    pictureIsExist = true;

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
                if (!response.records.length) this.pictureIsExist = false;
                this.picturesOfNews = response.records;
                this.smallPictureUrl = this.picturesOfNews[0].url; // this.findPictureUrlByTag(this.smallTag);

            })
            .catch(error => console.log(error));
    }

    findPictureUrlByTag(tag: string) {
        for (let picture of this.picturesOfNews) {
            if (picture.tag == tag) return picture.url;
        }
    }

}
