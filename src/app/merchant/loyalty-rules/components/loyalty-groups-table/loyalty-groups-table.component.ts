import { Component, OnInit } from '@angular/core';
import {LoyaltyGroup} from '../../../../_classes/loyalty/loyalty-group';
import {Subscription} from 'rxjs/Subscription';
import {LoyaltyGroupsService} from '../../../../_services/loyalty-groups.service';

@Component({
  selector: 'app-loyalty-groups-table',
  templateUrl: './loyalty-groups-table.component.html',
  styleUrls: ['./loyalty-groups-table.component.less']
})
export class LoyaltyGroupsTableComponent implements OnInit {
    loyaltyGroups: LoyaltyGroup[] = null;
    subscription: Subscription;

  constructor(private loyaltyGroupsService: LoyaltyGroupsService) { }

  ngOnInit() {
      this.getLoyaltyGroupsFromHttp();

  }

    getLoyaltyGroupsFromHttp() {
        this.subscription = this.loyaltyGroupsService.getLoyaltyGroups().subscribe(res => this.loyaltyGroups = res);
        this.loyaltyGroupsService.updateLoyaltyGroups();
    }

}
