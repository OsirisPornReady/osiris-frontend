import { Component, OnInit } from '@angular/core';
import { Criteria } from "../../../models/criteria";
import {FormControl, FormGroup, FormArray, FormBuilder, Validators, Form} from "@angular/forms";
import { SearchService } from "../../../service/search/search.service";

@Component({
  selector: 'multi-condition-search-page',
  templateUrl: './multi-condition-search-page.component.html',
  styleUrls: ['./multi-condition-search-page.component.less']
})
export class MultiConditionSearchPageComponent implements OnInit {

  conditionList: string[] = [];
  selectedConditionList: any[] = [];
  criteriaList: Criteria[] = [];
  criteriaForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = []; //为了删除的时候好找control

  conditionPlaceHolder:string = "条件";
  contentPlaceHolder:string = "内容";

  saveLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
  ) { }


  ngOnInit(): void {
    this.criteriaForm = this.fb.group({});
    this.getCriteriaList();
    this.conditionList = this.searchService.getConditionList()
  }


  getCriteriaList() {
    const syncList = this.searchService.getCriteriaList();
    syncList.forEach(criteria => {
      this.addCriteria(criteria);
    })
  }


  addCriteria(criteria: Criteria) {
    const id = this.criteriaList.length;
    this.criteriaList.push(criteria);

    const control = {
      id,
      controlInstance:`criteria${id}`,
    };
    this.listOfControl.push(control)

    this.criteriaForm.addControl(
      control.controlInstance,
      this.fb.group({
        condition:[criteria.condition,[Validators.required]],
        content:[criteria.content,[Validators.required]],
      })
    )

    this.criteriaForm.setValidators(Validators.required);
    this.criteriaForm.updateValueAndValidity();
  }


  createCriteria(e?:any) {
    if (e) {
      e.preventDefault(); //除了给button加type=button外还能用这种方式防止submit
    }

    const id = this.criteriaList.length;
    const criteria = {
      condition:'',
      content:'',
    };
    this.criteriaList.push(criteria)

    const control = {
      id,
      controlInstance:`criteria${id}`,
    };
    this.listOfControl.push(control)

    this.criteriaForm.addControl(
      control.controlInstance,
      this.fb.group({
          condition:['',[Validators.required]],
          content:['',[Validators.required]],
      })
    )

    this.criteriaForm.setValidators(Validators.required);
    this.criteriaForm.updateValueAndValidity();
  }


  removeCriteria(control:{ id: number; controlInstance: string },e:any) {
    e.preventDefault();
    const index = this.listOfControl.indexOf(control);
    this.listOfControl.splice(index,1);
    this.criteriaForm.removeControl(control.controlInstance);
  }


  saveCriteriaList() {
    this.saveLoading = true;
    let data = [];
    for (let c in this.criteriaForm.value) {
      data.push(this.criteriaForm.value[c]);
    }
    this.searchService.saveCriteriaList(data)
    console.log(data);
    setTimeout(()=>{
      this.saveLoading = false;
    },300)
  }


  resetCriteriaList() {
    this.criteriaList = [];
    this.listOfControl = [];
    for (const control in this.criteriaForm.controls) {
      this.criteriaForm.removeControl(control);
    }
  }


  // selectCondition(control:any) {
  //   const condition = this.criteriaForm.get(control.controlInstance)?.get('condition')?.value
  //   const index = this.conditionList.indexOf(condition)
  //   const selected = {
  //     condition: condition,
  //     index: index
  //   }
  //   this.selectedConditionList.push(selected)
  //   this.conditionList.splice(index,1);
  // }


}
