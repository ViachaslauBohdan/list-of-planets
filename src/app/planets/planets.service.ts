import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PlanetsResponse, Planet } from './planets.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private readonly base = 'http://0.0.0.0:8080/api/planets/'

  planetsSharedData: BehaviorSubject<any> = new BehaviorSubject({})
  activePlanet: BehaviorSubject<any> = new BehaviorSubject(null)


  constructor(private http: HttpClient) { }

  buildUrl(text: string, page: string | number): string {
    return `${this.base}?search=${text}&page=${page}`
  }

  getPlanet(id: string) {
    return this.http.get<Planet>(`${this.base}${id}`)
  }
  searchPlanets(text?: string, url?: string) {
    return this.http.get<PlanetsResponse>(url || `${this.base}?search=${text}`)
  }
}
