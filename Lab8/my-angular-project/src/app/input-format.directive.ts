import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    this.formatInput();
  }

  private formatInput() {
    const inputValue = this.el.nativeElement.value;
    this.el.nativeElement.value = inputValue.toUpperCase();
  }
}

