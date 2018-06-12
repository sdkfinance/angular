import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";
import {Profile} from "../../../../_classes/profile";
import {ClientsService} from "../../../../_services/clients.service";

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styles: []
})
export class ClientDetailsComponent implements OnInit {
    clientId;
    clientProfile: Profile = null;

    constructor(private route: ActivatedRoute, private titleService: Title, private clientsServise: ClientsService) {
        this.titleService.setTitle(PAGE_TITLES.clients);

        TitleService.setTitle(WINDOW_TITLE.clients);
    }

    ngOnInit() {
        this.clientId = this.route.snapshot.params['id'];
        this.getProfile();
    }

    getProfile() {
        this.clientsServise.getUserProfileById(this.clientId)
            .then(response => this.clientProfile = response)
            .catch(error => console.log(error));
    }

}
