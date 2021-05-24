export default class IdGenerator {
  count: number;

  constructor() {
    this.count = 0;
  }

  getId(): number {
    this.count++;
    return this.count;
  }
}
