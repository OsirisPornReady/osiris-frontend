import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function LinkValidator(control: AbstractControl) {
  const value = control.value;

  if (value.length > 3) {
    return { age:true }
  } else {
    return null
  }
}
