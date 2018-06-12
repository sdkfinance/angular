import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {OPERATORS_ROUTES} from './operators.routing';
import {OperatorsComponent} from './components/operators/operators.component';

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(OPERATORS_ROUTES)
  ],
  declarations: [OperatorsComponent]
})
export class OperatorsModule { }
