import { Component, inject } from '@angular/core';
import { CardsStore } from '../../../core/cards/cards-store';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';

@Component({
  selector: 'app-card-list',
  imports: [TruncatePipe],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  protected card = inject(CardsStore);
  flashcards = this.card.flashcards;
  count = this.card.count;
  learningCount = this.card.learningCount;
  knownCount = this.card.knownCount;
  notSeenCount = this.card.notSeenCount;

  cycleStatus(event: Event, id: string) {
    event.preventDefault();
    this.card.cycleStatus(id);
  }

  removeCard(event: Event, id: string) {
    event.preventDefault();
    this.card.remove(id);
  }
}
