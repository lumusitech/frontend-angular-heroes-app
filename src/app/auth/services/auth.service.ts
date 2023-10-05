import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: User;
  private baseURL: string = environments.baseURL;

  constructor(private readonly http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // this.http.post<User>(`${this.baseURL}/login`, { email, password })

    return this.http.get<User>(`${this.baseURL}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', user.id.toString()))
    );
  }
}
