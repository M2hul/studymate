import { Component } from '@angular/core';
interface Topic {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-topic-list',
  imports: [],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList {
  topics: Topic[] = [
    { id: '1', title: 'First title', description: 'First description' },
    { id: '2', title: 'Second title', description: 'Second description' },
    { id: '3', title: 'Third title', description: 'Third description' },
  ];
}
