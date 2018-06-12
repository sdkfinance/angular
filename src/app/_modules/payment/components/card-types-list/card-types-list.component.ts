import { Component, OnInit } from '@angular/core';
import {ACCEPT_TYPES} from '../../shared/accept-types';

@Component({
  selector: 'app-card-types-list',
  templateUrl: './card-types-list.component.html',
  styleUrls: ['./card-types-list.component.css']
})
export class CardTypesListComponent implements OnInit {
  acceptTypes = ACCEPT_TYPES;
  acceptTypeKeys: Array<string> = Object.keys(this.acceptTypes);

  constructor() { }

  ngOnInit() {
  }

}
