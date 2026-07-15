import { Component, computed, inject, signal } from '@angular/core';
import { CardsStore } from '../../../core/cards/cards-store';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { TopicsStore } from '../../../core/topics/topics-store';
import { Flashcard } from '../card.model';

@Component({
  selector: 'app-card-list',
  imports: [TruncatePipe],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  protected cardsStore = inject(CardsStore);
  protected topicsStore = inject(TopicsStore);
  private _filter = signal<Flashcard['status'] | 'all'>('all');

  flashcards = this.cardsStore.flashcards;
  count = this.cardsStore.count;
  learningCount = this.cardsStore.learningCount;
  knownCount = this.cardsStore.knownCount;
  notSeenCount = this.cardsStore.notSeenCount;
  topics = this.topicsStore.topics;

  filter = this._filter.asReadonly();
  filteredCards = computed(() => {
    const selectedFilter = this.filter();
    const cards = this.flashcards();
    if (selectedFilter === 'all') {
      return cards;
    }
    return cards.filter((i) => i.status === selectedFilter);
  });

  cycleStatus(id: string) {
    this.cardsStore.cycleStatus(id);
  }

  removeCard(id: string) {
    this.cardsStore.remove(id);
  }

  addCard(event: Event, topicId: string, front: string, back: string) {
    event.preventDefault();
    this.cardsStore.add(topicId, front, back);
  }

  setFilter(filter: Flashcard['status'] | 'all') {
    this._filter.set(filter);
  }
}
