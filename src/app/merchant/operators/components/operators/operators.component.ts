import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../../../_services/title.service";
import {WINDOW_TITLE} from "../../../../app.constants";

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styles: []
})
export class OperatorsComponent implements OnInit {

  constructor() {

      TitleService.setTitle(WINDOW_TITLE.operators);
  }

  ngOnInit() {
  }

}
