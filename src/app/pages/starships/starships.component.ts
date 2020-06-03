import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SwapiService } from 'src/app/services/swapi/swapi.service';
import { startWith, map } from 'rxjs/operators';
import { Starship } from 'src/app/interfaces/starship';
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
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
  animations: [fadeAnimation, listAnimation],
})
export class StarshipsComponent implements OnInit {
  filteredOptions: Observable<Starship[]>;
  searchValue = new FormControl();
  starships: Starship[] = [];
  page = 1;
  starshipsLength: number;

  constructor(
    private swapiServ: SwapiService,
  ) { }

  ngOnInit(): void {
    // Get all planets from the API
    this.initializeStarships();
  }

  initializeStarships() {
    this.swapiServ.getStarships(this.page).subscribe((starships) => {
      // Add newly found planets
      this.starships = [...this.starships, ...starships.results];

      // Repeat for next page if there is one (recursively)
      this.page++;
      if (starships.next) {
        this.initializeStarships();
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

  getImage(name: string) {
    if (name.includes('Death Star')) {
      return '../../../assets/images/starships/Death Star.png';
    }
    if (name.includes('Star Destroyer')) {
      return '../../../assets/images/starships/star-destroyer.png';
    }
    else {
      return '../../../assets/images/starships/Starship.png';
    }
  }

  private _filter(value: string): Starship[] {
    const filterValue = value.toLowerCase();
    const output = this.starships.filter(planet => planet.name.toLowerCase().includes(filterValue));
    this.starshipsLength = output.length;

    return output;
  }

}
