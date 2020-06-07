import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PlanetsResponse, Planet } from './planets.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  readonly base = 'http://0.0.0.0:8080/api/planets/'

  activePlanet: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  getPlanet(id: string) {
    return this.http.get<Planet>(`${this.base}${id}`)
  }
  searchPlanets(text?: string, url?: string) {
    return this.http.get<PlanetsResponse>(url || `${this.base}?search=${text}`)
  }
}
