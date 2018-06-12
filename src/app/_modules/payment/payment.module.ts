import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';

import {PaymentComponent} from './payment.component';
import {
    HeaderComponent,
    PaymentAdviceComponent,
    PaymentTypesMenuComponent,
    PaymentTypeMenuItemComponent,
    PaymentTypeComponent,
    BankCardTypeComponent,
    CardComponent,
    CardFaceComponent,
    CardBackComponent,
    CardTypesListComponent,
    CheckoutComponent,
    FooterComponent,
    ContactInfoComponent,
    InfoComponent,
} from './components';

import {
    InputComponent,
    InputNumberComponent,
    InputTextComponent,
    InputDateComponent,
    InputCvvComponent,
    InputPhoneNumberComponent,
} from './shared/components';

import {
    OrderService,
    PaymentTypeService,
    CardKeeperService,
} from './providers';

import {
    CreditCardMaskPipe,
    NumbersOnlyPipe,
    HideSymbolsPipe,
    LettersOnlyPipe,
} from './pipes';
import {PaymentMethodsService} from '../payment-methods/services/payment-methods.service';
import {UiModule} from '../ui/ui.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        UiModule
    ],
    declarations: [
        PaymentComponent,
        HeaderComponent,
        PaymentAdviceComponent,
        PaymentTypesMenuComponent,
        PaymentTypeMenuItemComponent,
        PaymentTypeComponent,
        BankCardTypeComponent,
        CardComponent,
        CardFaceComponent,
        CardBackComponent,
        CardTypesListComponent,
        InputComponent,
        CreditCardMaskPipe,
        NumbersOnlyPipe,
        HideSymbolsPipe,
        CheckoutComponent,
        FooterComponent,
        ContactInfoComponent,
        LettersOnlyPipe,
        InfoComponent,
        InputNumberComponent,
        InputTextComponent,
        InputDateComponent,
        InputCvvComponent,
        InputPhoneNumberComponent
    ],
    providers: [
        OrderService,
        PaymentTypeService,
        CardKeeperService,
        CreditCardMaskPipe,
        NumbersOnlyPipe,
        HideSymbolsPipe,
        PaymentMethodsService
    ],
    exports: [PaymentComponent, BankCardTypeComponent]
})
export class PaymentModule {
}
