import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { DashboardLayout } from './features/dashboard/layout/dashboard-layout';
import { authGuard } from './core/auth/auth.guard';
import { guestGuard } from './core/auth/guest.guard';
import { DashboardHome } from './features/dashboard/home/dashboard-home';
import { DashboardUsers } from './features/dashboard/users/dashboard-users';

export const routes: Routes = [
  {
    title: 'home',
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    title: 'login',
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    title: 'dashboard',
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        title: 'Accueil',
        path: '',
        component: DashboardHome,
      },
      { title: 'Utilisateurs', path: 'users', component: DashboardUsers },
    ],
  },
];
