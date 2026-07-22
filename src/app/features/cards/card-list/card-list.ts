import { Component, computed, inject, signal } from '@angular/core';
import { CardsStore } from '../../../core/cards/cards-store';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { TopicsStore } from '../../../core/topics/topics-store';
import { Flashcard } from '../card.model';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-card-list',
  imports: [TruncatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  protected cardsStore = inject(CardsStore);
  protected topicsStore = inject(TopicsStore);
  private _filter = signal<Flashcard['status'] | 'all'>('all');
  searchTerm = signal('');

  cardToEdit = signal<string>('');
  editingFront = signal<string>('');
  editingBack = signal<string>('');
  flashcards = this.cardsStore.flashcards;
  count = this.cardsStore.count;
  learningCount = this.cardsStore.learningCount;
  knownCount = this.cardsStore.knownCount;
  notSeenCount = this.cardsStore.notSeenCount;
  topics = this.topicsStore.topics;

  cardForm = new FormGroup({
    topicId: new FormControl('', { nonNullable: true, validators: Validators.required }),
    front: new FormControl('', { nonNullable: true, validators: Validators.required }),
    back: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  filter = this._filter.asReadonly();
  filteredCards = computed(() => {
    const status = this.filter();
    const term = this.searchTerm().toLowerCase().trim();
    let cards = this.flashcards();

    if (status !== 'all') cards = cards.filter((c) => c.status === status);
    if (term) {
      cards = cards.filter(
        (c) => c.front.toLowerCase().includes(term) || c.back.toLowerCase().includes(term),
      );
    }
    return cards;
  });

  cycleStatus(id: string) {
    this.cardsStore.cycleStatus(id);
  }

  removeCard(id: string) {
    this.cardsStore.remove(id);
  }

  setFilter(filter: Flashcard['status'] | 'all') {
    this._filter.set(filter);
  }

  editCard(flashcard: Flashcard) {
    this.cardToEdit.set(flashcard.id);
    this.editingFront.set(flashcard.front);
    this.editingBack.set(flashcard.back);
  }

  saveCard(flashcard: Flashcard) {
    this.cardsStore.update(flashcard.id, {
      front: this.editingFront(),
      back: this.editingBack(),
    });
    this.cardToEdit.set('');
    this.editingFront.set('');
    this.editingBack.set('');
  }

  cancelEdit() {
    this.cardToEdit.set('');
    this.editingFront.set('');
    this.editingBack.set('');
  }

  onSubmit() {
    const { topicId, front, back } = this.cardForm.getRawValue();
    this.cardsStore.add(topicId, front, back);
    this.cardForm.reset();
  }
}
