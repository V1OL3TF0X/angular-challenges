/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="href" [fragment]="anchor" (click)="scrollToAnchor()">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() href = '';
  @Input() anchor?: string;

  scrollToAnchor() {
    if (!this.anchor) return;
    document
      .getElementById(this.anchor)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
