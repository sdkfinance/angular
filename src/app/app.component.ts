import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {I18nService} from './_services/i18n.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    localesIsLoaded: boolean;

    constructor(private router: Router, private i18nService: I18nService) {
        this.router.events.subscribe((path) => {
            window.scrollTo(0, 0);
            // if (path.url != this.url) {
            //     this.url = path.url;
            //     window.scrollTo(0, 0);
            // }
        });

        this.i18nService.localesIsLoadedSubject.subscribe(data => {
            this.localesIsLoaded = data as boolean;
        });
        this.i18nService.initLocales();
    }
}
