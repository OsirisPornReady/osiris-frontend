import { Component, OnInit } from '@angular/core';
import { Criteria } from "../../../models/criteria";
import {FormControl, FormGroup, FormArray, FormBuilder, Validators, Form} from "@angular/forms";

@Component({
  selector: 'app-multi-condition-search-page',
  templateUrl: './multi-condition-search-page.component.html',
  styleUrls: ['./multi-condition-search-page.component.less']
})
export class MultiConditionSearchPageComponent implements OnInit {

  conditionList: string[] = ['aa','bbbbbbbbbbbbbbbbbbbbb','cc'];
  condition!:string;
  content!:string;
  criteriaList:Criteria[] = [];
  criteriaForm!:FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  conditionPlaceHolder:string = "condition";
  contentPlaceHolder:string = "content you wanna match";


  constructor(
    private fb:FormBuilder,
  ) { }



  ngOnInit(): void {
    this.criteriaForm = this.fb.group({});
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

  addConditon(optionInput:HTMLInputElement) {
    const value = optionInput.value;
    if (this.conditionList.indexOf(value) === -1) {
      this.conditionList = [...this.conditionList, value || `New Condition at ${this.conditionList.length + 1}`]
    }
  }


  search() {
    console.log(this.criteriaForm);
  }



}
