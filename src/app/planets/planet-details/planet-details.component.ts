import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '../planets.interface';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.sass']
})
export class PlanetDetailsComponent implements OnInit {
  planet: Planet
  constructor(
    private route: ActivatedRoute,
    private plnService: PlanetsService
  ) { }

  ngOnInit(): void {
    this.plnService.activePlanet.subscribe((planet:Planet) => {
      console.log(planet)

      this.planet = planet
    })

    if (!this.planet) {
      const id = this.route.snapshot.paramMap.get('id');
      this.plnService.getPlanet(id)
      .subscribe((planet: Planet) => {
        this.planet = planet
      })
    }
  }

}
