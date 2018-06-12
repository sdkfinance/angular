export class Promotion {
  title: string;
  product: string;
  starting: Date;
  ending: Date;
  description: string;

  constructor(promotion?: Promotion) {
    if (promotion) {
      this.title = promotion.title;
      this.product = promotion.product;
      this.starting = promotion.starting;
      this.ending = promotion.ending;
      this.description = promotion.description;
    }

  }
}
