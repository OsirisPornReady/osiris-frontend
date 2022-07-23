import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function ArrayDataTypeValidator(videoArrayData:any): ValidatorFn {    //用ValidatorFn写的要在调用时带括号,直接输出函数则不需要在调用时带括号
  return (control:AbstractControl) : ValidationErrors | null => {

    //发生在patch之后，就不用中间层的model了，直接用control的value
    const arrayDataControlValue = control.value;

    if (!arrayDataControlValue) {
      return { ArrayDataControlEmptyError: true };
    }

    if (arrayDataControlValue.length !== videoArrayData.length) { //数组长度不同直接dirty
      control.markAsDirty();
    } else { //数组长度相同的情况
      for (let i=0; i < videoArrayData.length; i++) {
        if (arrayDataControlValue[i] !== videoArrayData[i]) {
          control.markAsDirty();
          break; //return也行
        }
      }
    }
    return null;

  }
}
