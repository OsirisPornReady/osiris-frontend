import { Injectable } from '@angular/core';
import { Criteria } from "../../models/criteria";
import { Video } from "../../models/video";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  criteriaList: Criteria[] = [];

  constructor() { }

  addCriteria(criteria: Criteria) {
    this.criteriaList.push(criteria);
  }

  deleteCriteria() {

  }

  updateCriteria() {

  }

  retrieveCriteria() {

  }

  getCriteriaList() {
    return this.criteriaList;
  }

  saveCriteriaList(criteriaList:any) {
    this.criteriaList = criteriaList;
  }

  getConditionList() {
    const conditionList: any[] = [];
    const VideoInstance = new Video();
    for (let prop in VideoInstance) {
      conditionList.push(prop);
    }
    return conditionList;
  }


}
