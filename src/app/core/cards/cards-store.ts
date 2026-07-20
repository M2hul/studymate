import { computed, inject, Injectable, signal } from '@angular/core';
import { Flashcard } from '../../features/cards/card.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class CardsStore {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/cards';
  private _flashcard = signal<Flashcard[]>([]);

  flashcards = this._flashcard.asReadonly();
  count = computed(() => this._flashcard().length);
  learningCount = computed(() => this._flashcard().filter((i) => i.status === 'learning').length);
  knownCount = computed(() => this._flashcard().filter((i) => i.status === 'known').length);
  notSeenCount = computed(() => this._flashcard().filter((i) => i.status === 'not-seen').length);

  constructor() {
    this.http.get<Flashcard[]>(this.url).subscribe((cards) => this._flashcard.set(cards));
  }

  add(topicId: string, front: string, back: string) {
    if (!topicId) return;
    const newCard = {
      topicId: topicId,
      front: front,
      back: back,
      status: 'not-seen',
      updatedAt: Date.now(),
    };
    this.http
      .post<Flashcard>(this.url, newCard)
      .subscribe((created) => this._flashcard.update((list) => [...list, created]));
  }

  update(id: string, patch: Partial<Flashcard>) {
    this.http
      .patch<Flashcard>(`${this.url}/${id}`, patch)
      .subscribe((updated) =>
        this._flashcard.update((list) => list.map((i) => (i.id === id ? { ...i, ...updated } : i))),
      );
  }

  remove(id: string) {
    this.http
      .delete<Flashcard>(`${this.url}/${id}`)
      .subscribe(() => this._flashcard.update((list) => list.filter((i) => i.id !== id)));
  }

  cycleStatus(id: string) {
    const next = { 'not-seen': 'learning', learning: 'known', known: 'not-seen' } as const;
    const card = this._flashcard().find((c) => c.id === id);

    if (!card) return;

    const newStatus = next[card.status];

    this.http
      .patch<Flashcard>(`${this.url}/${id}`, { status: newStatus })
      .subscribe(() =>
        this._flashcard.update((list) =>
          list.map((i) => (i.id === id ? { ...i, status: newStatus } : i)),
        ),
      );
  }
}
