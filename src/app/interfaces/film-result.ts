import { Film } from './film';

export interface FilmResult {
  count: number;
  next?: any;
  previous?: any;
  results: Film[];
}
