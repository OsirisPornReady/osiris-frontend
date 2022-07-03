import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[addAttribute]'
})
export class addAttributeDirective {

  constructor(
    private el:ElementRef
  ) {
    this.el.nativeElement.field
  }

}
