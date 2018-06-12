import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './components/news/news.component';
import {NewsTableComponent} from './components/news-table/news-table.component';
import {AdminNewsItemComponent} from './components/news-item/news-item.component';
import {RouterModule} from '@angular/router';
import {NEWS_ROUTES} from './news.routing';
import {NewsService} from '../../_services/news.service';
import {CreateNewsFormComponent} from './components/create-news-form/create-news-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UploadServiceService} from '../../_services/upload-service.service';
import {ResultImgComponent} from './components/result-img/result-img.component';
import {OpenNewsComponent} from './components/open-news/open-news.component';
import {SnackBarService} from '../../_services/snack-bar.service';
import {SnackBarComponent} from '../../_modules/ui/components/snack-bar/snack-bar.component';
import {UiModule} from '../../_modules/ui/ui.module';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NEWS_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        MatSnackBarModule
    ],
    declarations: [
        NewsComponent,
        NewsTableComponent,
        AdminNewsItemComponent,
        CreateNewsFormComponent,
        ResultImgComponent,
        OpenNewsComponent
    ],
    providers: [NewsService, UploadServiceService, SnackBarService],
    entryComponents: [SnackBarComponent]

})
export class NewsModule {
}
