import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../providers';
import { Order } from '../../shared/order.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public order: Order;

  constructor(orderService: OrderService) {
    this.order = orderService.getOrder();
  }

  ngOnInit() {
  }
}
