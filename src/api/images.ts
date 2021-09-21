import type { Request, Response } from 'express';
import fetchJSONsAsync from '../utils/fetchJSONsAsync';
import type { castedImage, image, imagesResult } from './apis';
import { apis } from './apis';
import type { imageAPIResult } from './externalAPITypes';

export async function images(req: Request, res: Response): Promise<void> {
  const { query, page } = req.params;
  const requests = apis.map(({ url, key }) => ({
    url: url.replace(`{query}`, query).replace(`{page}`, page),
    key,
  }));

  const responses = (await fetchJSONsAsync(requests)) as imageAPIResult[];

  const results = responses.map((response, index) => {
    const { name: api, resultKeys, castImage } = apis[index];
    const { count: countImages, images } = resultKeys;

    const count = response[countImages] || 0;
    const results =
      response[images]?.map((image, index) => {
        const castedImage = castImage(image);
        const richImage = enrichImage(castedImage, api, index, count);
        return richImage;
      }) || [];

    return {
      count,
      images: results,
    };
  });

  const totalCount = results.reduce((total, result) => total + result.count, 0);

  const mergedResults = results.map((result) => result.images).flat();
  const sortedResults = mergedResults.sort((a, b) => (a.score < b.score ? 1 : -1));

  const jsonResponse: imagesResult = { count: totalCount, results: sortedResults };

  res.status(200).json(jsonResponse);
}

function enrichImage(castedImage: castedImage, api: string, index: number, total: number): image {
  return {
    ...castedImage,
    aspectRatio: getAspectRatio(castedImage.width, castedImage.height),
    api,
    score: total / (index + 1),
  };
}

function getAspectRatio(width: number, height: number): string {
  if (width === 0 || height === 0) return 'n/a';
  const ratio = (width / height).toFixed(2).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
  const ratioInverse = (height / width).toFixed(2).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');

  switch (ratio) {
    case '1.33':
      return `4:3`;
    case '0.75':
      return `3:4`;

    case '1.49':
      return `3:2`;
    case '1.5':
      return `3:2`;
    case '1.51':
      return `3:2`;
    case '0.66':
      return `2:3`;
    case '0.67':
      return `2:3`;

    case '1.25':
      return `5:4`;
    case '0.8':
      return `4:5`;

    case '1.19':
      return `6:5`;
    case '1.2':
      return `6:5`;
    case '1.21':
      return `6:5`;
    case '0.83':
      return `5:6`;
    case '0.84':
      return `5:6`;

    case '1.66':
      return `5:3`;
    case '1.67':
      return `5:3`;
    case '0.6':
      return `3:5`;

    case '1.77':
      return `16:9`;
    case '1.78':
      return `16:9`;
    case '0.56':
      return `9:16`;
    case '0.57':
      return `9:16`;

    case '1.6':
      return `16:10`;
    case '0.62':
      return `10:16`;
    case '0.63':
      return `10:16`;
  }

  if (width / height >= 1) return `${ratio}:1`;
  return `1:${ratioInverse}`;
}
