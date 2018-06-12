import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './components/news/news.component';
import {RouterModule} from "@angular/router";
import {NEWS_ROUTES} from "./news.routing";
import {NewsTableComponent} from "./components/news-table/news-table.component";
import {NewsItemComponent} from "./components/news-item/news-item.component";
import {NewsService} from "../../_services/news.service";
import { OpenNewsComponent } from './components/open-news/open-news.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NEWS_ROUTES),
    ],
    declarations: [
        NewsComponent,
        NewsTableComponent,
        NewsItemComponent,
        OpenNewsComponent
    ],
    providers: [NewsService]
})
export class NewsModule {
}
