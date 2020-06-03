import { Component, OnInit, ViewChild } from '@angular/core';
import { ImdbService } from 'src/app/services/imdb/imdb.service';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/services/swapi/swapi.service';
import { takeLast } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { Character } from 'src/app/interfaces/character';
import { Film } from 'src/app/interfaces/film';
import { FilmResult } from 'src/app/interfaces/film-result';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) peopleTable: MatTable<Character>;
  displayedColumns: string[] = ['name', 'height', 'gender', 'filmsCount'];
  dataSource = null;
  films: Film[] = [];
  people: Character[] = [];
  currentFilm: Film;

  constructor(
    private imdbServ: ImdbService,
    private swapiServ: SwapiService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Get router parameter
    this.router.params
      .subscribe((param) => {
        // Get all films from Swapi
        this.swapiServ.getFilms().pipe(takeLast(1)).subscribe((films) => {
          this.films = films.results;

          // Get film for current page
          this.currentFilm = this.films.filter((film: Film) => film.title === param.name)[0];

          this.currentFilm.characters.forEach((endpoint: string) => {
            this.swapiServ.getByEndpoint(endpoint).subscribe((character: Character) => {
              const newCharacter: Character = character;
              this.people.push(newCharacter);
            });
          });

          // Get IMDB data for this film
          this.imdbServ.getMovie(this.currentFilm.title, this.currentFilm.release_date.split('-')[0]).subscribe((film: any) => {
            this.currentFilm.image = film.Poster;
            this.currentFilm.rating = film.Ratings.find((rating: any) => rating.Source === 'Rotten Tomatoes').value;
            this.currentFilm.genres = film.Genre;
            this.currentFilm.summary = film.Plot;
            this.dataSource = this.people;
            setTimeout(() => {
              this.peopleTable.renderRows();
            }, 2000);
          });
        });

      });
  }

}
