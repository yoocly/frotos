import type { Image } from './image';

export type DbCollection = {
  _id?: string;
  collectionName: string;
  userId: string;
  lastChangeAt: number;
  images: string[];
  imageCount?: number;
  lastImage?: { image: Image }[];
  imagesList?: { image: Image }[];
  hasSelectedImage?: boolean;
};
