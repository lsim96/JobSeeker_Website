import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appToggleDetails]',
})
export class ToggleDetails {
  private elementRef = inject(ElementRef);

  isInitiallyOpen = input(false);

  moreDetails: HTMLDivElement;

  isOpen = false;

  ngOnInit() {
    this.isOpen = this.isInitiallyOpen();

    this.moreDetails =
      this.elementRef.nativeElement.querySelector('.more-details');

    this.moreDetails.style.overflow = 'hidden';
    this.moreDetails.style.transition = '0.2 ease-in';
    this.moreDetails.style.maxHeight = this.isOpen ? '300px' : '0px';
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const target = event.target as HTMLElement;

    if (target.tagName !== 'H3') return;

    this.isOpen = !this.isOpen;

    this.moreDetails.style.maxHeight = this.isOpen ? '300px' : '0px';
  }
}
