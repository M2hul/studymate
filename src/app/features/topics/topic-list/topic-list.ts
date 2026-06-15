import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';
import { Highlight } from '../../../shared/directives/highlight';
interface Topic {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-topic-list',
  imports: [TitleCasePipe, TruncatePipe, Highlight],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList {
  topics: Topic[] = [
    { id: '1', title: 'First title', description: 'First description' },
    { id: '2', title: 'Second title', description: 'Second description' },
    { id: '3', title: 'Third title', description: 'Third description' },
    { id: '4', title: 'fOrTh title', description: 'Third description' },
    { id: '5', title: 'fIftH titlE', description: 'Third description' },
    {
      id: '6',
      title: 'siXTh tITle',
      description:
        'Third descriptionfffffffffff dddddddddddddf fffffffffffffffffffffff ddddddddddddddddddddddd dddddddddddd w   wwwwwwwwwwwwwww         wwwwwwwS',
    },
  ];
}
