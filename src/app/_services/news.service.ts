import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class NewsService {
    private getNewsUrl = URL_CONSTANTS.news;
    private createNewsUr = URL_CONSTANTS.newsCreate;

    private newsSubject: Subject<any> = new Subject();

    private lastBody;

    constructor(private http: HttpClient) {
    }

    /**
     * Getting list of conversation (news)
     * @param body
     * @returns {Promise<T>}
     */

    getNewsList(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.post(this.getNewsUrl + '/view', JSON.stringify(body), options)
            .toPromise<any>();
    }

    getNews() {
        return this.newsSubject.asObservable();
    }

    updateNews(body?) {
        if (body) {
            this.lastBody = body;
        }
        this.getNewsList(this.lastBody).then(res => this.newsSubject.next(res));
    }

    /**
     * Getting messages for specified conversation
     * @param conversationId
     * @param body
     * @returns {Promise<T>}
     */

    getMessageFromNewsConversation(conversationId: string, body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        let newsMessageUrl = `${this.getNewsUrl}/${conversationId}/messages/view`;
        return this.http.post(newsMessageUrl, JSON.stringify(body), options).toPromise<any>();
    }


    /**
     * Getting pictures urls for message in conversation
     * @param conversationId
     * @param messageId
     * @returns {Promise<T>}
     */

    getPicturesUrlFromNewsConversation(conversationId: string, messageId: string) {
        let newsPicturesUrl = `${this.getNewsUrl}/${conversationId}/messages/${messageId}/media-files`;
        return this.http.get(newsPicturesUrl).toPromise<any>();
    }

    createNews(dataBody) {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        return this.http.post(this.createNewsUr, JSON.stringify(dataBody), options).toPromise<any>();
    }
}
