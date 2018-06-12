import {Coin} from '../_classes/coin';
import {PaymentProvider} from './payment-provider';

export interface GateTransactionState {
    id: string;
    orderId: number;
    deviceId: string;
    deviceOrderId: string;
    type: string;
    status: string;
    errorCode: string;
    coin: Coin;
    paymentMethod: PaymentProvider;
    sourceAmount: number;
    amountToSend: number;
    finalAmount: number;
    processId: string;
}
