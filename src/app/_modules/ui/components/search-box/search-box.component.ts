import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TitleService} from '../../../../_services/title.service';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent implements OnInit {

    @Output() menuTrigger = new EventEmitter();

    title: string = '';

    constructor(private authService: AuthorizationService) {
        TitleService.getTitle().subscribe(
            title => this.title = title
        );
    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logoutUser();
    }

    showMenu() {
        this.menuTrigger.emit();
    }

}
