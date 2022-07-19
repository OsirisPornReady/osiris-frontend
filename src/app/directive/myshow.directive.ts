import {Directive, Input, OnChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[myshow]'
})
export class MyshowDirective implements OnChanges {

  @Input() myshow!: boolean;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
  ) { }

  ngOnChanges() {
    if(this.myshow) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

}
