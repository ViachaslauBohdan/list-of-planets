import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '../planets.interface';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.sass']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  private plnSubscription
  planet: Planet


  constructor(
    private route: ActivatedRoute,
    private plnService: PlanetsService
  ) { }

  ngOnInit(): void {
    this.plnSubscription = this.plnService.activePlanet
    .subscribe((planet: Planet) => {
      this.planet = planet
    })
    if (!this.planet) {
      this.getPlanetById()
    }
  }

  private getPlanetById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.plnService.getPlanet(id)
    .subscribe((planet: Planet) => {
      this.planet = planet
    })
  }

  ngOnDestroy(): void {
    this.plnSubscription.unsubscribe()
  }

}
