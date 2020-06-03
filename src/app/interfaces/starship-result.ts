import { Starship } from './starship';

export interface StarshipResult {
  count: number;
  next: string;
  previous?: any;
  results: Starship[];
}
