import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-template #cityItem let-name="name" let-id="id">
      <app-list-item [name]="name" (delete)="deleteCity(id)" />
    </ng-template>
    <app-card
      [list]="cities"
      [listItem]="cityItem"
      (addNew)="addNewCity()"
      customClass="bg-light-yellow">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(125, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: Signal<City[]>;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {
    this.cities = toSignal(store.cities$, { initialValue: [] });
  }

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }
  addNewCity() {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
