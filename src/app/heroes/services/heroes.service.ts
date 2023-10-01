import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from 'environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseURL: string = environments.baseURL;

  constructor(private readonly http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }
}
