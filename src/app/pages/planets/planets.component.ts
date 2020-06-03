import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { SwapiService } from 'src/app/services/swapi/swapi.service';
import { Planet } from 'src/app/interfaces/planet';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true}
    )
  ])
]);

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  animations: [fadeAnimation, listAnimation],
})
export class PlanetsComponent implements OnInit {
  filteredOptions: Observable<Planet[]>;
  searchValue = new FormControl();
  planets: Planet[] = [];
  page = 1;
  planetsLength: number;

  constructor(
    private swapiServ: SwapiService,
  ) { }

  ngOnInit(): void {
    // Get all planets from the API
    this.initializePlanets();
  }

  initializePlanets() {
    this.swapiServ.getPlanets(this.page).subscribe((planets) => {
      // Add newly found planets
      this.planets = [...this.planets, ...planets.results];

      // Repeat for next page if there is one (recursively)
      this.page++;
      if (planets.next) {
        this.initializePlanets();
      }
      else {
        this.filteredOptions = this.searchValue.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }
    });
  }

  getImage(terrain: string) {
    if (terrain.includes('rock') || terrain.includes('mountains')) {
      return '../../../assets/images/planets/rocky-planet.png';
    }
    if (terrain.includes('volcanoes')) {
      return '../../../assets/images/planets/volcano-planet.png';
    }
    if (terrain.includes('forests') || terrain.includes('grasslands')) {
      return '../../../assets/images/planets/green-planet.png';
    }
    if (terrain.includes('desert') || terrain.includes('savanna') || terrain.includes('barren')) {
      return '../../../assets/images/planets/desert-planet.png';
    }
    if (terrain.includes('ice')) {
      return '../../../assets/images/planets/ice-planet.png';
    }
    if (terrain.includes('gas')) {
      return '../../../assets/images/planets/gas-planet.png';
    }
    if (terrain.includes('ocean')) {
      return '../../../assets/images/planets/ocean-planet.png';
    }
    if (terrain.includes('swamp')) {
      return '../../../assets/images/planets/swamp-planet.png';
    }
    else {
      return '../../../assets/images/planets/swamp-planet.png';
    }
  }

  private _filter(value: string): Planet[] {
    const filterValue = value.toLowerCase();
    const output = this.planets.filter(planet => planet.name.toLowerCase().includes(filterValue));
    this.planetsLength = output.length;

    return output;
  }

}
