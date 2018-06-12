export class NewClientsGraph {
  values: number[] = [];
  summary: number = null;
  type: string = 'doughnut';
  constructor(arrayValues){
    this.values = arrayValues;
    this.summary = 0;
    for (let m of arrayValues ){
      this.summary += m;
    }
  }

  getSummary(array): number {
    let result: number = 0;
    for (let i = 0; i > array.length; i++){
      result += array[i];
    }
    return result;
  }
}
