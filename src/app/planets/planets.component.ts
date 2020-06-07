import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import { PlanetsService } from './planets.service';
import { PlanetsResponse, Planet } from './planets.interface';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin, Observable } from 'rxjs';
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
    .then(() => this.firstPage())
  }

  inputAction(text: string): void {
    this.searchPlanets(text, null)
    .then(() => {
      this.firstPage(this.event.pageSize)
      if (this.data.next) {
        this.loadMore(this.event)
      }
    })

  }

  private firstPage(pageSize?: number): void {
    this.event = {
      pageSize: pageSize || this.paginator.getInitialPageSize(),
      pageIndex: 0,
      previousPageIndex: null,
      length: this.data.count
    }
    this.paginator.resetPager()
  }

  pagerAction($event: PageEvent): void {
    if ($event.pageSize > this.data.count) {
      $event.pageSize = this.data.count
    }
    const itemsToSkip = $event.pageIndex * $event.pageSize
    const itemsLoaded = this.allLoadedPlanets.length

    if ($event.pageSize !== this.event.pageSize) {
      // IF ITEMS PER PAGE CHANGE
      if ($event.pageSize > itemsLoaded) {
        this.loadMore($event)
      } else if ($event.pageSize === 25 && itemsLoaded/$event.pageSize <= 2) {
        this.loadMore($event)
      } else if ($event.pageSize <= itemsLoaded) {
        this.calcUiPlanets($event.pageSize, itemsToSkip)
      }
    } else {
      // IF SLIDE RIGHT/LEFT
      if (itemsToSkip >= itemsLoaded) {
        this.loadMore($event)
      } else if($event.pageSize === 25 && itemsLoaded/$event.pageSize <= 2) {
        this.loadMore($event)
      } else if (itemsToSkip < itemsLoaded) {
        this.calcUiPlanets($event.pageSize, itemsToSkip)
      }
    }
    this.event = $event
  }

  private calcUiPlanets(pageSize: number, itemsToSkip: number = 0): void {
    this.uiPlanets = this.allLoadedPlanets
    .filter((planet: Planet, index: number) => index >= itemsToSkip)
    .filter((planet: Planet, index: number) => index < pageSize)
  }

  private loadMore($event: PageEvent): Promise<any> {
    return new Promise(resolve => {
      const requests = []
      const numOfPages = this.getNumberOfPages($event.pageSize, $event.pageIndex + 1)
      let startPage = Number(this.data.next.slice(-1))

      for (let i = startPage; i <= numOfPages; i++) {
        let url = this.data.next.replace(/.$/,`${i}`)
        let nextRequest = this.plnService.searchPlanets(null,url)
        requests.push(nextRequest)
      }
      this.searchPlanetsFork(requests)
      .then(() => resolve())
    })
  }

  private getNumberOfPages(pageSize: number, pageIndex: number) {
    const planetsCount = 10
    if (pageSize > this.data.count) {
      pageSize = this.data.count
    }
    let totalItems = pageSize*pageIndex
    if (totalItems > this.data.count) {
      totalItems = this.data.count
    }
    return Math.ceil(totalItems/planetsCount)
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
        this.calcUiPlanets(this.getPageSize(), this.event.pageIndex * this.event.pageSize)
        resolve()
      })
    })
  }

  viewPlanetDetails(planet: Planet): void {
    const id = planet.url // Allows to search by id if no planet
      .replace(this.plnService.base, '')
      .replace('/', '')

    this.router.navigate([`planet/${id}`])
    this.plnService.activePlanet.next(planet)
  }


}
