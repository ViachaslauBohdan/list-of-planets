import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import { PlanetsService } from './planets.service';
import { PlanetsResponse, Planet } from './planets.interface';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { PaginatorComponent } from '../common/pagination/paginator.component';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.sass']
})
export class PlanetsComponent implements OnInit, AfterViewInit {
  @ViewChild(PaginatorComponent) paginator: PaginatorComponent

  planets: Planet[] = []
  data: PlanetsResponse

  constructor(
    private plnService: PlanetsService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.searchPlanets('')
  }

  searchPlanets(text?: string, url?: string): void {
    this.plnService.searchPlanets(text,url)
    .subscribe((data: PlanetsResponse) => {
      this.data = data
      this.planets = data.results
    })
  }

  viewPlanetDetails(planet: Planet): void {
    const planetId = planet.url.split('/')[5]
    this.router.navigate([`planet/${planetId}`])

    this.plnService.activePlanet.next(planet)
  }

  inputAction(): void {
    this.paginator.resetPager()
  }

  pagerAction($event: PageEvent): void {
    const url = $event.pageIndex > $event.previousPageIndex ? this.data.next : this.data.previous
    this.searchPlanets(null, url)
  }

}
