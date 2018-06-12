import {Component, Inject, OnInit} from '@angular/core';
import {SnackBarService} from '../../../../_services/snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.less']
})
export class SnackBarComponent implements OnInit {
    message: string = '';
    action: string = '';

constructor(private snackBarService: SnackBarService) {
    this.message = this.snackBarService.getMessage();
  }

  ngOnInit() {

      this.action = this.snackBarService.getAction();
  }

}
