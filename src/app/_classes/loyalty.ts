export class Loyalty {
  id: string;
  transaction: string;
  date: Date;
  amount: number;

  constructor(loyalty?: Loyalty) {
    if (loyalty) {
      this.amount = loyalty.amount;
      this.id = loyalty.id;
      this.date = loyalty.date;
      this.transaction = loyalty.transaction;
    }
  }
}
