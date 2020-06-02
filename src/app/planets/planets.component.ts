import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlanetsService } from './planets.service';
import { PlanetsResponse, Planet } from './planets.interface';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.sass']
})
export class PlanetsComponent implements OnInit, AfterViewInit {

  planets: Planet[] = []
  data: PlanetsResponse

  constructor(private plnService: PlanetsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.plnService.getPlanets()
    .subscribe((data: PlanetsResponse) => {
      // console.log(data)
      // this.planets = data.results
    })
  }

  searchPlanets(text: string): void {
    this.plnService.searchPlanets(text)
    .subscribe((data: PlanetsResponse) => {
      console.log(data)
      this.data = data
      this.planets = data.results
    })
  }

}
