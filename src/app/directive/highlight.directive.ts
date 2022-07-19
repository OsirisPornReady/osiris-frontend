import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef) {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('')
  }

  private highlight(color: string) {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
    this.el.nativeElement.style.backgroundColor = color;
  }

}
