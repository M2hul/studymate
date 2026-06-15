import { Directive, ElementRef, input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
  },
})
export class Highlight {
  appHighlight = input<string>('lightyellow');
  private el = inject(ElementRef<HTMLElement>);

  onEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight() || 'lightyellow';
  }
  onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
