import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';

import { AdminSession, LoginCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _shouldLoadSession = signal(false);

  private readonly _apiUrl = '/api/admin/auth';

  // Session de l'administrateur connecté
  readonly currentAdmin = httpResource<AdminSession>(() =>
    this._shouldLoadSession() ? `${this._apiUrl}/me` : undefined,
  );

  // Déclenche la vérification de la session
  checkSession(): void {
    this._shouldLoadSession.set(true);
  }

  // Attend le résultat de la vérification de session
  waitForSession(): Observable<boolean> {
    this.checkSession();

    return toObservable(this.currentAdmin.status).pipe(
      filter((status) => status === 'resolved' || status === 'error'),
      take(1),
      map((status) => status === 'resolved'),
    );
  }

  // Connecte un administrateur
  login(credentials: LoginCredentials): Observable<void> {
    return this._http.get('/api/csrf').pipe(
      switchMap(() => this._http.post<void>(`${this._apiUrl}/login`, credentials)),
      tap(() => {
        const sessionAlreadyEnabled = this._shouldLoadSession();

        this._shouldLoadSession.set(true);

        if (sessionAlreadyEnabled) {
          this.currentAdmin.reload();
        }
      }),
    );
  }

  // Déconnecte l'administrateur
  logout(): Observable<void> {
    return this._http.get('/api/csrf').pipe(
      switchMap(() => this._http.post<void>(`${this._apiUrl}/logout`, {})),
      tap(() => {
        this._shouldLoadSession.set(false);
      }),
    );
  }
}
