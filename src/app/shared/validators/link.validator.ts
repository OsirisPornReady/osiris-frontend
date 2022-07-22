import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function LinkValidator(control: AbstractControl) {
//   const value = control.value;
//
//   if (value.length > 3) {
//     return { age:true }
//   } else {
//     return null
//   }
// }

export function LinkValidator(videoLinkList:any): ValidatorFn {    //用ValidatorFn写的要在调用时带括号,直接输出函数则不需要在调用时带括号
  return (control:AbstractControl) : ValidationErrors | null => {

    const formLinkList = control.value;

    if (!formLinkList) {
      return null;
    }

    if (formLinkList.length !== videoLinkList.length) {
      control.markAsDirty();
    } else { //数组长度相同的情况
      for (let i=0; i < formLinkList.length; i++) {
        if (formLinkList[i] !== videoLinkList[i]) {
          control.markAsDirty();
          return null;
          // break; //return也行
        }
      }
    }
    return null;

  }
}
