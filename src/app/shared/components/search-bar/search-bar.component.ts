import { Component, OnInit } from '@angular/core';
import { Criteria } from "../../../models/criteria";
import { slideDown } from "../../animations/common.animations";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
  animations: [slideDown]
})
export class SearchBarComponent implements OnInit {

  conditionList!: string[];
  searchCondition!: string;
  searchContent!: string;

  criteriaVisible:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  commitSearch(): void {

  }

  showCriteria() {
    this.criteriaVisible = !this.criteriaVisible;
  }


}
