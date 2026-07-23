import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
  {
    path: 'topics',
    loadComponent: () => import('./features/topics/topic-list/topic-list').then((m) => m.TopicList),
  },
  {
    path: 'cards',
    loadComponent: () => import('./features/cards/card-list/card-list').then((m) => m.CardList),
  },
];
