import { Component, computed, inject, Signal, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { APP_ROUTES } from '../../../core/routing/app-routes';

import { Header } from '../../../shared/components/header/header';
import { IHeaderOption } from '../../../shared/components/header/model/header.interface';
import { SideMenu } from '../../../shared/components/side-menu/side-menu';
import { IMenuOption } from '../../../shared/components/side-menu/model/side-menu.interface';

@Component({
  selector: 'bc-dashboard-layout',
  imports: [SideMenu, Header, RouterOutlet],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  // Dependencies
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  // Navigation state
  private readonly _currentUrl = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this._router.url),
    ),
    { initialValue: this._router.url },
  );

  // Derived navigation state
  protected readonly _pageTitle = computed(() => {
    this._currentUrl();

    let route = this._router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.title ?? '';
  });

  protected readonly _breadcrumb = computed(() => {
    this._currentUrl();

    let route = this._router.routerState.snapshot.root;
    const titles: string[] = [];

    while (route) {
      if (route.title && route.routeConfig?.path !== 'dashboard') {
        titles.push(route.title);
      }

      if (!route.firstChild) {
        break;
      }

      route = route.firstChild;
    }

    return titles;
  });

  // UI state
  protected readonly menuOptions = signal<IMenuOption>({
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

  protected readonly headerOptions = computed<IHeaderOption>(() => ({
    title: this._pageTitle(),
    breadcrumb: this._breadcrumb(),
    userEmail: this._authService.currentAdmin.value()?.email ?? '',
    buttons: [
      {
        icon: 'notifications',
        title: 'Notifications',
        isButtonIcon: true,
        action: () => {},
      },
      {
        icon: 'logout',
        title: 'Déconnexion',
        action: () => this._logout(),
      },
    ],
  }));

  // Private methods
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
