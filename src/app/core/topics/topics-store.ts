import { Injectable, computed, signal, inject } from '@angular/core';
import { Topic } from '../../features/topics/topic.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TopicsStore {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/topics';
  private _topics = signal<Topic[]>([]);

  topics = this._topics.asReadonly();
  count = computed(() => this._topics().length);

  constructor() {
    this.http.get<Topic[]>(this.url).subscribe((topics) => this._topics.set(topics));
  }

  add(title: string, description: string) {
    if (!title.trim()) return;
    const newTopic = {
      title: title.trim(),
      description: description.trim(),
      createdAt: Date.now(),
    };
    this.http
      .post<Topic>(this.url, newTopic)
      .subscribe((created) => this._topics.update((list) => [...list, created]));
  }

  update(id: string, patch: Partial<Topic>) {
    this.http
      .patch<Topic>(`${this.url}/${id}`, patch)
      .subscribe((updated) =>
        this._topics.update((list) => list.map((t) => (t.id === id ? { ...t, ...updated } : t))),
      );
  }

  remove(id: string) {
    this.http
      .delete<Topic>(`${this.url}/${id}`)
      .subscribe(() => this._topics.update((list) => list.filter((t) => t.id !== id)));
  }
}
