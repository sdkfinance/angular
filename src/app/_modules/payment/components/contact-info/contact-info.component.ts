import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Card } from '../../shared/card.model';
import { CardKeeperService } from '../../providers/card-keeper.service';
import { PATTERN } from '../../shared/patterns';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  public card: Card;
  public patterns = {
    phone: PATTERN.PHONE,
    email: PATTERN.EMAIL,
  };
  private subscription: Subscription;
  public useEmail: boolean;

  constructor(private cardKeeperService: CardKeeperService) { }

  ngOnInit() {
    this.card = this.cardKeeperService.card.getValue();
    this.subscription = this.cardKeeperService.card$.subscribe(
      (updatedCard) => {
        this.card = updatedCard;
      }
    );
  }

  public setPhone(value: string): void {
    this.setProp('phone', value);
  }

  public setEmail(value: string): void {
    this.setProp('email', value);
  }

  private setProp(key: string, value: string) {
    if (value.match(this.patterns[key])) {
      this.setCardProp(key, value);
    } else {
      this.setMistake(key);
    }
  }

  private getValidationKey(key: string) {
    return `is${key[0].toUpperCase()}${key.slice(1)}Valid`;
  }

  private setCardProp(key: string, value: string): void {
    const validationKey = this.getValidationKey(key);
    const newCard = {
      ...this.card,
      [key]: value,
      isValid: {
        ...this.card.isValid,
        [validationKey]: true,
      },
    };
    this.cardKeeperService.setCard(newCard);
  }

  private setMistake(key: string): void {
    const validationKey = this.getValidationKey(key);
    const newCard = {
      ...this.card,
      isValid: {
        ...this.card.isValid,
        [validationKey]: false,
      },
    };
    this.cardKeeperService.setCard(newCard);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
