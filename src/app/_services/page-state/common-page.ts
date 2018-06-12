import {Observable} from 'rxjs/Observable';
import {PageState} from './page-state';
import {Pagination} from './pagination';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import {HttpClient} from '@angular/common/http';


export class CommonPage<T> {

    private pageSubject: BehaviorSubject<PageState<T>>;
    private httpService: HttpClient;

    get pageObservable() {
        return this.pageSubject.asObservable();
    }

    constructor(httpService: HttpClient,
                requestUrl: string = 'unnamed') {
        this.httpService = httpService;
        this.pageSubject = new BehaviorSubject({
            requestUrl,
            pagination: new Pagination(),
            list: null
        });
    }

    public updatePagination(pagination: Pagination): void {
        this.pageSubject.value.pagination = pagination;
        this.updateList();
    }

    public getPagination() {
        return this.pageSubject.value.pagination;
    }

    public updateList(filter?): void {
        this.makeRequestWithParams(filter).do(pageState => this.pageSubject.next(pageState)).subscribe();
    }

    private getListParams(filter?) {
        if (filter) {
            return {
                pageNumber: this.pageSubject.value.pagination.page,
                pageSize: this.pageSubject.value.pagination.size,
                sort: {
                    date: 'desc'
                },
                filter: filter
            };
        }
        return {
            pageNumber: this.pageSubject.value.pagination.page,
            pageSize: 20,
            sort: {
                date: 'desc'
            },
            filter: {
                roles: [
                    'individual'
                ]
            }
        };
    }

    private makeRequestWithParams(filter?): Observable<PageState<T>> {
        return this.httpService.post(this.pageSubject.value.requestUrl, this.getListParams(filter)).map(this.responseMapper.bind(this));
    }

    private responseMapper(response: Response): PageState<T> {
        const json = response as any,
            page = json['pageNumber'],
            size = json['pageSize'],
            records = json['totalRecords'],
            totalPages = json['totalPages'],
            array = json['records'];
        return {
            pagination: new Pagination(page, size, records, totalPages),
            list: array,
            requestUrl: this.pageSubject.value.requestUrl
        };
    }
}
