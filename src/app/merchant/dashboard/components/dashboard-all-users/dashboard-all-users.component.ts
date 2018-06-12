import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../../../_services/statistic.service";

@Component({
  selector: 'app-dashboard-all-users',
  templateUrl: './dashboard-all-users.component.html',
  styles: []
})
export class DashboardAllUsersComponent implements OnInit {
    allUsersCount: number = 0;
  constructor(private statisticService: StatisticService) {
      this.statisticService.getAllUsers().then(this.setUserCount.bind(this));
  }

  ngOnInit() {
  }

  setUserCount(data){
      this.allUsersCount = data.count;
  }
}
