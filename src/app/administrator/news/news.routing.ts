import {Routes} from '@angular/router';
import {NewsComponent} from './components/news/news.component';
import {OpenNewsComponent} from './components/open-news/open-news.component';

export const NEWS_ROUTES: Routes = [
    {path: '', component: NewsComponent},
    {path: ':title/:id', component: OpenNewsComponent },
    {path: '**', redirectTo: ''}
];
