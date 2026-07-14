# StudyMate

A flashcard study app, built to work through the **Angular 12 → Angular 22 delta** hands-on.

I've shipped Angular professionally since v12. It has changed enormously since then — standalone components, signals, the new control flow, zoneless change detection — so rather than read the changelog, I rebuilt from scratch on v22 and used each new primitive deliberately.

The goal is modern Angular idioms, not framework tourism: **no `NgModule`, no `*ngIf`, no `Zone.js`.**

---

## What it demonstrates

| Angular 22 feature | Where it's used |
|---|---|
| **Standalone components** | Every component. No `NgModule` anywhere — each declares its own `imports`. |
| **Signals** (`signal`, `computed`) | `TopicsStore` / `CardsStore` hold state in signals; the counts (total, learning, known, not-seen) are `computed` and re-derive automatically. |
| **`effect()`** | Reactive `localStorage` persistence — the effect *reads* the signal and *writes* to storage, so saving is a consequence of state changing rather than something every caller must remember to do. |
| **New control flow** | `@for` with a required `track`, `@if` / `@else`, and `@empty` blocks for empty states. |
| **`inject()`** | Used over constructor injection throughout. |
| **`providedIn: 'root'` stores** | Two different components inject the same `TopicsStore` instance and see the same live data — components are views, stores are state. |
| **Zoneless** | v22 ships without `zone.js` at all. Change detection is driven by signals and events. |
| **Custom pipe & directive** | `TruncatePipe` (pure), `Highlight` attribute directive. |
| **Router** | `routerLink` navigation, route config, `<router-outlet />`. |

## Features

- Create topics; add flashcards against a topic
- Cycle a card's status: `not-seen` → `learning` → `known`
- Live per-status counts, derived through `computed` signals
- Everything persists to `localStorage` and survives a reload
- Honest empty states — the add-card form disables itself when no topics exist yet, instead of accepting a submit and silently doing nothing

## Stack

Angular 22 · TypeScript 6 · Signals · SCSS · Vitest

## Running it

Requires **Node 20.19+ / 22.12+ / 24+** — Angular 22 will not run on Node 18.

```bash
npm ci
npm start          # → http://localhost:4200
```

```bash
npm run build      # production build
npm test           # unit tests (Vitest)
```

## Project shape

```
src/app/
├── core/                    # state — injectable signal stores
│   ├── topics/topics-store.ts
│   └── cards/cards-store.ts
├── features/                # views
│   ├── topics/topic-list/
│   └── cards/card-list/
└── shared/
    ├── pipes/truncate-pipe.ts
    └── directives/highlight.ts
```

State lives in `core/`; `features/` only renders it. No component owns data that another component needs.

## Status

**Phase 1 in progress** — signals + `localStorage`, no RxJS, no backend.

Next: per-topic detail route, status filtering via a derived `computed`, and edit/delete.

Later phases: reactive forms, HTTP with functional interceptors, RxJS ↔ signal interop, lazy routes, NgRx SignalStore, `@defer`, SSR + hydration.
