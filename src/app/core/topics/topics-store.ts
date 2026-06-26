import { Injectable, computed, effect, signal } from '@angular/core';
import { Topic } from '../../features/topics/topic.model';

const STORAGE_KEY = 'studymate.topics';

@Injectable({ providedIn: 'root' })
export class TopicsStore {
  private _topics = signal<Topic[]>(this.load());

  topics = this._topics.asReadonly();
  count = computed(() => this._topics().length);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._topics()));
    });
  }

  add(title: string, description: string) {
    if (!title.trim()) return;
    const topic: Topic = {
      title: title.trim(),
      description: description.trim(),
      createdAt: Date.now(),
      id: crypto.randomUUID(),
    };
    this._topics.update((list) => [...list, topic]);
  }

  update(id: string, patch: Partial<Topic>) {
    this._topics.update((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  remove(id: string) {
    this._topics.update((list) => list.filter((t) => t.id !== id));
  }

  private load(): Topic[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
}
