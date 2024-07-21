import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-template #teacherItem let-name="firstName" let-id="id">
      <app-list-item [name]="name" (delete)="deleteTeacher(id)" />
    </ng-template>
    <app-card
      [list]="teachers"
      [listItem]="teacherItem"
      (addNew)="addNewTeacher()"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Signal<Teacher[]>;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {
    this.teachers = toSignal(store.teachers$, { initialValue: [] });
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  addNewTeacher() {
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
