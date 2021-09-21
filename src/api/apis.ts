import dotenv from 'dotenv';
import type { imageAPIImage, pexelsImage, pixabayImage, unsplashImage } from './externalAPITypes';
dotenv.config();

export type image = castedImage & {
  aspectRatio: string;
  api: string;
  score: number;
};

export type castedImage = {
  id: string;
  title?: string;
  width: number;
  height: number;
  urlSource: string;
  author: string;
  urlAuthor?: string;
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
};

export type imagesResult = {
  count: number;
  results: image[];
};

export type api = {
  name: apiNames;
  key: string;
  url: string;
  resultKeys: {
    count: 'total' | 'total_results';
    images: 'results' | 'photos' | 'hits';
  };
  castImage: (image: imageAPIImage) => castedImage;
};

export type apiNames = 'unsplash' | 'pexels' | 'pixabay';

export type apiResult = {
  total?: number;
  total_results?: number;
  results?: { id?: string }[];
}[];

export const apis: api[] = [
  {
    name: 'unsplash',
    key: process.env.KEY_UNSPLASH || '',
    url: `https://api.unsplash.com/search/photos?query={query}&lang=de&per_page=30&page={page}`,
    resultKeys: {
      count: 'total',
      images: 'results',
    },
    castImage: function (image: imageAPIImage): castedImage {
      const unsplashImage = image as unsplashImage;

      return {
        id: `u${unsplashImage?.id}` || '',
        title: unsplashImage?.alt_description || '',
        width: unsplashImage?.width || 0,
        height: unsplashImage?.height || 0,
        urlSource: unsplashImage?.links?.html || '',
        author: unsplashImage?.user?.name || '',
        urlAuthor: unsplashImage?.user?.links?.html || '',
        src: `${unsplashImage?.urls?.raw}` || '',
        thumbnail: unsplashImage?.urls?.thumb || '',
        thumbnailWidth: 200,
        thumbnailHeight:
          unsplashImage?.width && unsplashImage?.height
            ? (unsplashImage?.width / 200) * unsplashImage?.height
            : 0,
      };
    },
  },
  {
    name: 'pexels',
    key: process.env.KEY_PEXELS || '',
    url: `https://api.pexels.com/v1/search?query={query}&locale=de-DE&per_page=30&page={page}`,
    resultKeys: {
      count: 'total_results',
      images: 'photos',
    },
    castImage: function (image: imageAPIImage): castedImage {
      const pexelsImage = image as pexelsImage;
      return {
        id: `e${pexelsImage?.id}` || '',
        width: pexelsImage?.width || 0,
        height: pexelsImage?.height || 0,
        urlSource: pexelsImage?.url || '',
        author: pexelsImage?.photographer || '',
        urlAuthor: pexelsImage?.photographer_url || '',
        src: pexelsImage?.src?.original || '',
        thumbnail: pexelsImage?.src?.tiny || '',
        thumbnailWidth: 280,
        thumbnailHeight: 200,
      };
    },
  },
  {
    name: 'pixabay',
    url: `https://pixabay.com/api/?key=${
      process.env.KEY_PIXABAY || ''
    }&q={query}&lang=de&per_page=30&page={page}`,
    key: ``,
    resultKeys: {
      count: 'total',
      images: 'hits',
    },
    castImage: function (image: imageAPIImage): castedImage {
      const pixabayImage = image as pixabayImage;
      return {
        id: `i${pixabayImage?.id}` || '',
        title: pixabayImage?.tags || '',
        width: pixabayImage?.imageWidth || 0,
        height: pixabayImage?.imageHeight || 0,
        urlSource: pixabayImage?.pageURL || '',
        author: pixabayImage?.user || '',
        src: pixabayImage?.previewURL?.replace('_150.', '_1920.') || '',
        thumbnail: pixabayImage?.webformatURL || '',
        thumbnailWidth: pixabayImage?.webformatWidth || 0,
        thumbnailHeight: pixabayImage?.webformatHeight || 0,
      };
    },
  },
];
