import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content />
      <section>
        @for (item of list(); track item.id) {
          <ng-container *ngTemplateOutlet="listItem; context: item" />
        }
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="this.addNew.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent<Item extends { id: unknown }> {
  @Input({ required: true }) list!: Signal<Item[]>;
  @Input() customClass = '';
  @Input({ required: true }) listItem!: TemplateRef<Item>;
  @Output() addNew = new EventEmitter<void>();

  constructor() {}
}
