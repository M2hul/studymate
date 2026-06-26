import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { Highlight } from '../../../shared/directives/highlight';
import { Topic } from '../topic.model';
import { TopicsStore } from '../../../core/topics/topics-store';

@Component({
  selector: 'app-topic-list',
  imports: [TitleCasePipe, TruncatePipe, Highlight],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList {
  protected store = inject(TopicsStore);
  topics = this.store.topics;
  count = this.store.count;

  addTopic(event: Event, title: string, description: string) {
    event.preventDefault();
    this.store.add(title, description);
  }
}
