import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmResult } from 'src/app/interfaces/film-result';
import { PlanetResult } from 'src/app/interfaces/planet-result';
import { StarshipResult } from 'src/app/interfaces/starship-result';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  endpoint = 'https://swapi.dev/api/';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get films
   */
  getFilms(): Observable<FilmResult> {
    return this.http.get(this.endpoint + 'films/') as Observable<FilmResult>;
  }

  /**
   * Get films
   */
  getPlanets(page: number): Observable<PlanetResult> {
    return this.http.get(this.endpoint + 'planets/?page=' + page) as Observable<PlanetResult>;
  }

  /**
   * Get films
   */
  getStarships(page: number): Observable<StarshipResult> {
    return this.http.get(this.endpoint + 'starships/?page=' + page) as Observable<StarshipResult>;
  }

  /**
   * Get the result of the endpoint
   *
   * @param endpoint URL of the endpoint
   */
  getByEndpoint(endpoint: string) {
    return this.http.get(endpoint);
  }
}
