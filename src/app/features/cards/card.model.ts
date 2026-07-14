export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  status: 'not-seen' | 'learning' | 'known';
  updatedAt: number;
}
