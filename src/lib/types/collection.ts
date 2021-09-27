import type { image } from './image';

export type collection = {
  _id: string;
  collectionName: string;
  userId: string;
  createdAt: number;
  images: image[];
};
