import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  endpoint = 'http://www.omdbapi.com/?apikey=86cb4b99&';

  constructor(private http: HttpClient) { }

  /**
   * Get a single movie
   *
   * @param name Name of the movie
   * @param year Release date of the movie
   */
  getMovie(name: string, year: string) {
    return this.http.get(this.endpoint + 't=' + name + '&y=' + year + '&plot=full');
  }
}
