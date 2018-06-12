import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard-pos-select',
  templateUrl: './dashboard-pos-select.component.html',
  styles: []
})
export class DashboardPosSelectComponent implements OnInit {
    @Input() posListItems;
    @Output() changeSelect = new EventEmitter();
    posSelectForm: FormGroup;
  constructor(fb: FormBuilder) {
      this.posSelectForm = fb.group({
          'posItem': [null]
      });
  }

  ngOnInit() {

  }

    onItemChange(form: FormGroup){
        this.changeSelect.emit(this.posSelectForm.get('posItem').value);
    }

}
