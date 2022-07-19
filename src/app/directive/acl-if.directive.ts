import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AclService } from "../service/acl/acl.service";

@Directive({
  selector: '[aclIf]'
})
export class AclIfDirective implements OnChanges {

  @Input() aclIf!: string;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private aclService: AclService,
  ) { }

  ngOnChanges() {
    let accessibility = this.aclService.buttonRoleValidate(this.aclIf);
    if(accessibility) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

}
