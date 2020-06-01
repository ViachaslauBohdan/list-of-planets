import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PlanetsResponse } from './planets.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private readonly base = 'http://0.0.0.0:8080/api/planets/'

  constructor(private http: HttpClient) { }

  getPlanets() {
    return this.http.get<PlanetsResponse>(this.base)
  }
}
