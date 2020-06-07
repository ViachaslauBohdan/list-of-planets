import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import { PlanetsService } from './planets.service';
import { PlanetsResponse, Planet } from './planets.interface';
import { PageEvent } from '@angular/material/paginator';
import { Subject, forkJoin, Observable } from 'rxjs';
import { PaginatorComponent } from '../common/pagination/paginator.component';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.sass']
})
export class PlanetsComponent implements OnInit, AfterViewInit {
  @ViewChild(PaginatorComponent) paginator: PaginatorComponent

  allLoadedPlanets: Planet[] = []
  uiPlanets: Planet[] = []

  data: PlanetsResponse
  event: PageEvent

  constructor(
    private plnService: PlanetsService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.searchPlanets('', null)
    .then(() => {
        this.event = {
          pageSize: this.paginator.getInitialPageSize(),
          pageIndex: 0,
          previousPageIndex: null,
          length: this.data.count
        }
    })
  }

  inputAction(text: string): void {
    this.searchPlanets(text, null)
    .then(() => {
      if (this.data.next) {
        this.loadMore(this.event)
        this.paginator.resetPager()
      }
    })

  }

  pagerAction($event: PageEvent): void {
    if ($event.pageSize > this.data.count) {
      $event.pageSize = this.data.count
    }

    if ($event.pageSize !== this.event.pageSize) {
      if ($event.pageSize > this.allLoadedPlanets.length) {
        this.loadMore($event)
      } else if($event.pageSize <= this.allLoadedPlanets.length) {
        this.calcUiPlanets($event.pageSize)
      }
    }
    this.event = $event
  }

  private calcUiPlanets(pageSize: number): void {
    this.uiPlanets = this.allLoadedPlanets.filter(
      (planet: Planet, index: number) => index < pageSize
    )
  }

  private loadMore($event: PageEvent): Promise<any> {
    return new Promise(resolve => {

      const requests = []
      const numOfPages = this.numberOfPagesToLoad($event.pageSize)
      let startPage = Number(this.data.next.slice(-1))

      for(let i = startPage; i <= numOfPages; i++) {
        let url = this.data.next.replace(/.$/,`${i}`)
        let nextRequest = this.plnService.searchPlanets(null,url)

        requests.push(nextRequest)
      }
      console.log(requests)

      this.searchPlanetsFork(requests)
      .then(() => resolve())
    })
  }

  private numberOfPagesToLoad(pageSize: number) {
    const planetsCount = 10
    if (pageSize > this.data.count) {
      pageSize = this.data.count
    }
    return Math.ceil(pageSize/planetsCount)
  }

  private searchPlanets(text?: string, url?: string): Promise<any> {
    return new Promise(resolve => {
      this.plnService.searchPlanets(text,url)
      .subscribe(
        (data: PlanetsResponse) => {
          this.data = data
          this.allLoadedPlanets = data.results
          this.calcUiPlanets(this.getPageSize())

          resolve()
      })
    })
  }

  private getPageSize(): number {
    return this.event && this.event.pageSize || this.paginator.getInitialPageSize()
  }

  private searchPlanetsFork(requests: Observable<any>[]): Promise<any> {
    return new Promise(resolve => {
      forkJoin(requests)
      .subscribe((data: PlanetsResponse[]) => {
        this.data = data[data.length -1]

        data.forEach((response: PlanetsResponse) => {
          this.allLoadedPlanets = [...this.allLoadedPlanets, ...response.results]
        })

        this.calcUiPlanets(this.getPageSize())

        resolve()
      })
    })
  }

  viewPlanetDetails(planet: Planet): void {
    const planetId = planet.url.split('/')[5]
    this.router.navigate([`planet/${planetId}`])

    this.plnService.activePlanet.next(planet)
  }


}
