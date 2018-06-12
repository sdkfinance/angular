import {Injectable} from '@angular/core';

import {Order} from '../shared/order.model';
import {ORDER} from '../shared/mock-order';

@Injectable()
export class OrderService {

    constructor() {
    }

    public getOrder(): Order {
        return ORDER;
    }

}
