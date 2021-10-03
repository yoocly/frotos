import type { image } from './image';

export type dbCollection = {
  _id?: string;
  collectionName: string;
  userId: string;
  lastChangeAt: number;
  images: string[];
  imageCount?: number;
  lastImage?: { image: image }[];
  imagesList?: { image: image }[];
  hasSelectedImage?: boolean;
};
