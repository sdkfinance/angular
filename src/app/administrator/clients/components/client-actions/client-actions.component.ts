import {Component, Input, OnInit} from '@angular/core';
import {ClientsService} from "../../../../_services/clients.service";

@Component({
    selector: 'app-client-actions',
    templateUrl: './client-actions.component.html',
    styles: []
})
export class ClientActionsComponent implements OnInit {
    @Input() client;

    constructor(private clientService: ClientsService) {
    }

    ngOnInit() {
    }

    onActivate() {
        this.clientService.updateClient(this.client.id, {"active": true})
            .then(res => this.client.active = true)
            .catch();
    }

    onDeactivate() {
        this.clientService.updateClient(this.client.id, {"active": false})
            .then(res => this.client.active = false)
            .catch();
    }

}
