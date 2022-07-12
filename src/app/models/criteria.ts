export class Criteria {
  condition!: string;
  content!: string;

  constructor(
    condition:string,
    content:string
  ) {
    this.condition = condition;
    this.content = content;
  }
}
