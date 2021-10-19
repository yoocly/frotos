import type { ImageAPIImage, PexelsImage, PixabayImage, UnsplashImage } from './externals';

export type FiltersAspectRatio = 'nofilter' | 'landscape' | 'square' | 'portrait';

export type Image = CastedImage & {
  aspectRatio: string;
  api: string;
  score: number;
};

export type CastedImage = {
  id: string;
  title?: string;
  width: number;
  height: number;
  urlSource: string;
  author: string;
  urlAuthor?: string;
  src: string;
  preview: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  likes?: number;
  views?: number;
  downloads?: number;
  createdAt?: string;
};

export type ImagesResult = {
  count: number;
  results: Image[];
};

export type DbImage = {
  _id?: string;
  imageId: string;
  image: Image;
};

export type Api = {
  name: ApiNames;
  key: string;
  url: string;
  aspectRatios: Record<FiltersAspectRatio, string>;
  resultKeys: {
    count: 'total' | 'total_results';
    images: 'results' | 'photos' | 'hits';
  };
  castImage: (image: ImageAPIImage) => CastedImage;
};

export type ApiNames = 'unsplash' | 'pexels' | 'pixabay';
export type ApiColorKeys = keyof typeof apiColorMap;

export type ApiResult = {
  total?: number;
  totalResults?: number;
  results?: { id?: string }[];
}[];

export const apis: Api[] = [
  {
    name: 'unsplash',
    key: process.env.KEY_UNSPLASH || '',
    url: `https://api.unsplash.com/search/photos?query={query}&lang=de&per_page=30&page={page}&orientation={aspectRatio}&color={color}`,
    aspectRatios: {
      nofilter: '',
      landscape: 'landscape',
      square: 'squarish',
      portrait: 'portrait',
    },
    resultKeys: {
      count: 'total',
      images: 'results',
    },
    castImage: function (image: ImageAPIImage): CastedImage {
      const unsplashImage = image as UnsplashImage;

      return {
        id: `u${unsplashImage?.id}` || '',
        title: unsplashImage?.alt_description || '',
        width: unsplashImage?.width || 0,
        height: unsplashImage?.height || 0,
        urlSource: unsplashImage?.links?.html || '',
        author: unsplashImage?.user?.name || '',
        urlAuthor: unsplashImage?.user?.links?.html || '',
        src: `${unsplashImage?.urls?.raw}` || '',
        preview: `${unsplashImage?.urls?.regular}` || '',
        thumbnail: unsplashImage?.urls?.thumb || '',
        thumbnailWidth: 200,
        thumbnailHeight:
          unsplashImage?.width && unsplashImage?.height
            ? (unsplashImage?.width / 200) * unsplashImage?.height
            : 0,
        createdAt: unsplashImage?.created_at || '',
        likes: unsplashImage?.likes || 0,
      };
    },
  },
  {
    name: 'pexels',
    key: process.env.KEY_PEXELS || '',
    url: `https://api.pexels.com/v1/search?query={query}&locale=de-DE&per_page=30&page={page}&orientation={aspectRatio}&color={color}`,
    aspectRatios: {
      nofilter: '',
      landscape: 'landscape',
      square: 'square',
      portrait: 'portrait',
    },
    resultKeys: {
      count: 'total_results',
      images: 'photos',
    },
    castImage: function (image: ImageAPIImage): CastedImage {
      const pexelsImage = image as PexelsImage;
      return {
        id: `e${pexelsImage?.id}` || '',
        width: pexelsImage?.width || 0,
        height: pexelsImage?.height || 0,
        urlSource: pexelsImage?.url || '',
        author: pexelsImage?.photographer || '',
        urlAuthor: pexelsImage?.photographer_url || '',
        src: pexelsImage?.src?.original || '',
        preview: `${pexelsImage?.src?.original}?auto=compress&w=1280` || '',
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
    }&q={query}&lang=de&per_page=30&page={page}&orientation={aspectRatio}&colors={color}`,
    aspectRatios: {
      landscape: 'horizontal',
      nofilter: 'all',
      square: 'noRequest',
      portrait: 'vertical',
    },
    key: ``,
    resultKeys: {
      count: 'total',
      images: 'hits',
    },
    castImage: function (image: ImageAPIImage): CastedImage {
      const pixabayImage = image as PixabayImage;
      return {
        id: `i${pixabayImage?.id}` || '',
        title: pixabayImage?.tags || '',
        width: pixabayImage?.imageWidth || 0,
        height: pixabayImage?.imageHeight || 0,
        urlSource: pixabayImage?.pageURL || '',
        author: pixabayImage?.user || '',
        src: pixabayImage?.previewURL?.replace('_150.', '_1920.') || '',
        preview: pixabayImage?.previewURL?.replace('_150.', '_1280.') || '',
        thumbnail: pixabayImage?.previewURL?.replace('_150.', '_640.') || '',
        thumbnailWidth: pixabayImage?.webformatWidth || 0,
        thumbnailHeight: pixabayImage?.webformatHeight || 0,
        views: pixabayImage?.views || 0,
        downloads: pixabayImage?.downloads || 0,
        likes: pixabayImage?.likes || 0,
      };
    },
  },
];

export const apiColorMap = {
  monochrom: {
    unsplash: 'black_and_white',
    // pexels: 'black',
    pexels: 'noRequest',
    pixabay: 'grayscale',
  },
  black: {
    unsplash: 'black',
    // pexels: 'black',
    pexels: 'noRequest',
    pixabay: 'black',
  },
  white: {
    unsplash: 'white',
    // pexels: 'white',
    pexels: 'noRequest',
    pixabay: 'white',
  },
  gray: {
    unsplash: 'noRequest',
    // pexels: 'gray',
    pexels: 'noRequest',
    pixabay: 'gray',
  },
  red: {
    unsplash: 'red',
    // pexels: 'red',
    pexels: 'noRequest',
    pixabay: 'red',
  },
  orange: {
    unsplash: 'orange',
    // pexels: '#e68600',
    pexels: 'noRequest',
    pixabay: 'orange,brown',
  },
  yellow: {
    unsplash: 'yellow',
    // pexels: 'yellow',
    pexels: 'noRequest',
    pixabay: 'yellow',
  },
  green: {
    unsplash: 'green',
    // pexels: 'green',
    pexels: 'noRequest',
    pixabay: 'green',
  },
  teal: {
    unsplash: 'teal',
    // pexels: 'turquoise',
    pexels: 'noRequest',
    pixabay: 'turquoise',
  },
  blue: {
    unsplash: 'blue',
    // pexels: 'blue',
    pexels: 'noRequest',
    pixabay: 'blue',
  },
  purple: {
    unsplash: 'purple',
    // pexels: '#b366ff',
    pexels: 'noRequest',
    pixabay: 'lilac,pink',
  },
};

export type ImageColors = { rgb: [number, number, number]; hsl: [number, number, number] };
