import {Component, Input, OnInit} from '@angular/core';
import {ClientsService} from '../../../../_services/clients.service';

@Component({
    selector: 'app-client-item',
    templateUrl: './client-item.component.html',
    styleUrls: ['./client-item.component.less']
})
export class ClientItemComponent implements OnInit {
    @Input() clientItem;
    cards = [];

    constructor(private clientService: ClientsService) {
        //   console.log(this.clientItem.members);
        //  this.orgIds.push(this.clientItem.members.organization.id);
    }

    ngOnInit() {
        this.clientService.getSmartCard(this.clientItem.members[0].organization.id)
            .then(this.mapCards.bind(this))
            .catch(e => e);
    }

    mapCards(data) {
        this.cards = [];
        this.cards.push(data);
    }

}
