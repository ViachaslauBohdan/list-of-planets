import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailsComponent } from './planets/planet-details/planet-details.component';



const routes: Routes = [
  {
    path: '',
    component: PlanetsComponent,
    children: [

    ]
  },
  {
    path: 'planet/:id',
    component: PlanetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
