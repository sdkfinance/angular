export class Operator {
  id: string;
  type: string;
  name: string;
  posId: string;

  constructor(operator?: Operator) {
    if (operator) {
      this.id = operator.id;
      this.type = operator.type;
      this.name = operator.name;
      this.posId = operator.posId;
    }

  }
}
