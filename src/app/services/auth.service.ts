import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(
    protected http: HttpClient,
    protected jwt: JwtService,
    protected router: Router
  ) {
    this.fetchUser();
  }

  isLoggedIn() {
    return this.jwt.hasToken();
  }

  login(username: string, password: string) {
    return this.http.post<{user: User, token: string}>('/api/login', {username, password})
      .pipe(
        tap(res => this.jwt.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
      );
  }

  logout() {
    this.jwt.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/']);
  }

  fetchUser() {
    this.http.get<User>('/api/users/me')
      .subscribe(user => this._currentUser$.next(user));
  }
}
