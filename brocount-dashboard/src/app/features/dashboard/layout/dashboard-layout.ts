import { Component, computed, inject, Signal, signal } from '@angular/core';
import { SideMenu } from '../../../shared/components/side-menu/side-menu';
import { Header } from '../../../shared/components/header/header';
import { IMenuOption } from '../../../shared/components/side-menu/model/side-menu.interface';
import { IHeaderOption } from '../../../shared/components/header/model/header.interface';
import { AuthService } from '../../../core/auth/auth.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { APP_ROUTES } from '../../../core/routing/app-routes';

@Component({
  imports: [SideMenu, Header, RouterOutlet],
  selector: 'bc-dashboard-layout',
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  private readonly _currentUrl = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this._router.url),
    ),
    { initialValue: this._router.url },
  );

  protected menuOptions = signal<IMenuOption>({
    title: 'Brocount',
    buttons: [
      {
        title: 'Accueil',
        icon: 'dashboard',
        isActive: this._isRouteActive(APP_ROUTES.DASHBOARD),
        action: () => {
          this._router.navigate([APP_ROUTES.DASHBOARD]);
        },
      },
      {
        title: 'Utilisateurs',
        icon: 'group',
        isActive: this._isRouteActive(APP_ROUTES.DASHBOARD_USERS),
        action: () => {
          this._router.navigate([APP_ROUTES.DASHBOARD_USERS]);
        },
      },
    ],
  });

  protected headerOptions = signal<IHeaderOption>({
    title: 'Dashboard',
    subtitle: 'Bienvenue sur votre Dashboard Brocount',
    buttons: [
      {
        icon: 'logout',
        action: () => this._logout(),
      },
    ],
  });

  private _logout(): void {
    this._authService.logout().subscribe({
      next: () => this._router.navigate([APP_ROUTES.LOGIN]),
      error: (error) => console.error('Erreur lors de la déconnexion', error),
    });
  }

  private _isRouteActive(route: string): Signal<boolean> {
    return computed(() => this._currentUrl() === route);
  }
}
