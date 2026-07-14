import { computed, effect, Injectable, signal } from '@angular/core';
import { Flashcard } from '../../features/cards/card.model';

const STORAGE_KEY = 'studymate.cards';

@Injectable({ providedIn: 'root' })
export class CardsStore {
  private _flashcard = signal<Flashcard[]>(this.load());
  flashcards = this._flashcard.asReadonly();

  count = computed(() => this._flashcard().length);
  learningCount = computed(() => this._flashcard().filter((i) => i.status === 'learning').length);
  knownCount = computed(() => this._flashcard().filter((i) => i.status === 'known').length);
  notSeenCount = computed(() => this._flashcard().filter((i) => i.status === 'not-seen').length);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._flashcard()));
    });
  }

  add(topicId: string, front: string, back: string) {
    if (!topicId) return;
    const card: Flashcard = {
      id: crypto.randomUUID(),
      topicId: topicId,
      front: front,
      back: back,
      status: 'not-seen',
      updatedAt: Date.now(),
    };
    this._flashcard.update((list) => [...list, card]);
  }

  update(id: string, patch: Partial<Flashcard>) {
    this._flashcard.update((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  remove(id: string) {
    this._flashcard.update((list) => list.filter((i) => i.id !== id));
  }

  cycleStatus(id: string) {
    const next = { 'not-seen': 'learning', learning: 'known', known: 'not-seen' } as const;
    this._flashcard.update((list) =>
      list.map((i) => (i.id === id ? { ...i, status: next[i.status] } : i)),
    );
  }

  private load(): Flashcard[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
}
