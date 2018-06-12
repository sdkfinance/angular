import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {

  constructor(private titleService: Title) {
      this.titleService.setTitle(PAGE_TITLES.clients);

      TitleService.setTitle(WINDOW_TITLE.clients);
  }

  ngOnInit() {
  }

}
