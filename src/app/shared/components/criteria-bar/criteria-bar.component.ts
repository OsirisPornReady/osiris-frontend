import { Component, OnInit, Input } from '@angular/core';
import { Criteria } from "../../../models/criteria";

@Component({
  selector: 'criteria-bar',
  templateUrl: './criteria-bar.component.html',
  styleUrls: ['./criteria-bar.component.less']
})
export class CriteriaBarComponent implements OnInit {

  @Input() conditionList!: string[];
  @Input() criteria!:Criteria;

  condition!: string;
  content!: string;

  constructor() { }

  ngOnInit(): void {
    this.condition = this.criteria.condition;
    this.content = this.criteria.content;
  }

}
