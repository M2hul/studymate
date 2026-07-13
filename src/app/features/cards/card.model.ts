export interface Flashcard {
  id: string;
  topicsId: string;
  front: string;
  back: string;
  status: 'not-seen' | 'learning' | 'known';
  updatedAt: number;
}
