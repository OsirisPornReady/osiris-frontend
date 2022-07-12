import { Component, OnInit } from '@angular/core';
import { Criteria } from "../../../models/criteria";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {

  conditionList!: string[];
  searchCondition!: string;
  searchContent!: string;

  constructor() { }

  ngOnInit(): void {
  }

  commitSearch(): void {

  }
}
