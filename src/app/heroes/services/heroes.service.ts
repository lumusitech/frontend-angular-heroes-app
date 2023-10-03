import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { environments } from 'environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseURL: string = environments.baseURL;

  constructor(private readonly http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseURL}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes?q=${query}&_limit=5`);
  }
}
