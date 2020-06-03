import { Planet } from './planet';

export interface PlanetResult {
  count: number;
  next: string;
  previous?: any;
  results: Planet[];
}
