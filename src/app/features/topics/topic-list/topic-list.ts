import { Component, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { Highlight } from '../../../shared/directives/highlight';
import { TopicsStore } from '../../../core/topics/topics-store';
import { FormsModule } from '@angular/forms';
import { Topic } from '../topic.model';

@Component({
  selector: 'app-topic-list',
  imports: [TitleCasePipe, TruncatePipe, Highlight, FormsModule],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList {
  protected store = inject(TopicsStore);
  topics = this.store.topics;
  count = this.store.count;

  topicToEdit = signal<string>('');
  editingTitle = signal<string>('');
  editingDescription = signal<string>('');

  addTopic(event: Event, title: string, description: string) {
    event.preventDefault();
    this.store.add(title, description);
  }
  removeTopic(id: string) {
    this.store.remove(id);
  }

  editTopic(topic: Topic) {
    this.topicToEdit.set(topic.id);
    this.editingTitle.set(topic.title);
    this.editingDescription.set(topic.description);
  }

  saveTopic(id: string, title: string, description: string) {
    this.store.update(id, { title: title, description: description });
    this.topicToEdit.set('');
    this.editingTitle.set('');
    this.editingDescription.set('');
  }

  cancelEdit() {
    this.topicToEdit.set('');
    this.editingTitle.set('');
    this.editingDescription.set('');
  }
}
