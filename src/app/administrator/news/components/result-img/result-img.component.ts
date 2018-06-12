import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-result-img',
  templateUrl: './result-img.component.html',
  styles: []
})
export class ResultImgComponent implements OnInit {
    @Input() imgItem;
  constructor() { }

  ngOnInit() {
  }


}
