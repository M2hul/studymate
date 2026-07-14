import { Component, inject } from '@angular/core';
import { CardsStore } from '../../../core/cards/cards-store';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { TopicsStore } from '../../../core/topics/topics-store';

@Component({
  selector: 'app-card-list',
  imports: [TruncatePipe],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  protected cardsStore = inject(CardsStore);
  protected topicsStore = inject(TopicsStore);
  flashcards = this.cardsStore.flashcards;
  count = this.cardsStore.count;
  learningCount = this.cardsStore.learningCount;
  knownCount = this.cardsStore.knownCount;
  notSeenCount = this.cardsStore.notSeenCount;
  topics = this.topicsStore.topics;

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
}
