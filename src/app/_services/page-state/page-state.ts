import {Pagination} from './pagination';

export interface PageState<T> {
    requestUrl: string;
    pagination: Pagination;
    list: Array<T>;
}
