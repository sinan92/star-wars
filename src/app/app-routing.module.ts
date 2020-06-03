import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './pages/films/films.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { StarshipsComponent } from './pages/starships/starships.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'starships',
    pathMatch: 'full',
    data: {
      name: 'Starships',
    },
  },
  {
    path: 'films/:name',
    component: FilmsComponent,
    data: {
      name: 'Films',
      subItems: [
        'A New Hope',
        'The Empire Strikes Back',
        'Return of the Jedi'
      ]
    },
  },
  {
    path: 'planets',
    component: PlanetsComponent,
    data: {
      name: 'Planets',
    },
 },
  {
    path: 'starships',
    component: StarshipsComponent,
    data: {
      name: 'Starships',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
