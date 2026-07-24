import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
  {
    path: 'topics',
    loadComponent: () => import('./features/topics/topic-list/topic-list').then((m) => m.TopicList),
    canActivate: [authGuard],
  },
  {
    path: 'cards',
    loadComponent: () => import('./features/cards/card-list/card-list').then((m) => m.CardList),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
];
