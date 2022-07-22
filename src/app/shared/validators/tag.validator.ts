import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export function TagValidator(control: AbstractControl) {
  const value = control.value;

  console.log('test',control) //在生成控件的时候校验一次，在加入formgroup的时候再校验一次

  return null
}

