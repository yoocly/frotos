import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbFindOne, dbInsertOne, dbUpdateOne } from '../../utils/database';
import fetchJSONsAsync from '../../utils/fetchJSONsAsync';
import { error, result } from '../../utils/responses';
import type { collection } from '../types/collection';
import type { imageAPIResult } from '../types/externals';
import type { castedImage, dbImage, image, imagesResult } from '../types/image';
import { apis } from '../types/image';

export const IMAGE_ERROR = {
  AUTH_FAILED: { resultCode: 403, httpCode: 401, description: 'Authentication failed' },
  NO_COLLECTIONID: { resultCode: 501, httpCode: 400, description: 'No collection id' },
  NO_IMAGE: { resultCode: 502, httpCode: 400, description: 'No image' },
  ADD_IMAGE_FAILED: {
    resultCode: 503,
    httpCode: 503,
    description: 'Failed to add image',
  },
  DELETE_IMAGE_FAILED: {
    resultCode: 504,
    httpCode: 500,
    description: 'Failed to delete image',
  },
  INVALID_COLLECTION: { resultCode: 505, httpCode: 400, description: 'No valid collection' },
  IMAGE_ALREADY_IN_COLLECTION: {
    resultCode: 506,
    httpCode: 400,
    description: 'The image is already in this collection',
  },
};
const imagesCollection = 'images';
const dbCollection = 'collections';

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
      return `4 : 3`;
    case '0.75':
      return `3 : 4`;

    case '1.49':
      return `3 : 2`;
    case '1.5':
      return `3 : 2`;
    case '1.51':
      return `3 : 2`;
    case '0.66':
      return `2 : 3`;
    case '0.67':
      return `2 : 3`;

    case '1.25':
      return `5 : 4`;
    case '0.8':
      return `4 : 5`;

    case '1.19':
      return `6 : 5`;
    case '1.2':
      return `6 : 5`;
    case '1.21':
      return `6 : 5`;
    case '0.83':
      return `5 : 6`;
    case '0.84':
      return `5 : 6`;

    case '1.66':
      return `5 : 3`;
    case '1.67':
      return `5 : 3`;
    case '0.6':
      return `3 : 5`;

    case '1.77':
      return `16 : 9`;
    case '1.78':
      return `16 : 9`;
    case '0.56':
      return `9 : 16`;
    case '0.57':
      return `9 : 16`;

    case '1.6':
      return `16 : 10`;
    case '0.62':
      return `10 : 16`;
    case '0.63':
      return `10 : 16`;
  }

  if (width / height >= 1) return `${ratio} : 1`;
  return `1 : ${ratioInverse}`;
}

export async function addImage(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, IMAGE_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  if (!req.body.collectionId) return error(req, res, IMAGE_ERROR.NO_COLLECTIONID);
  const { collectionId } = req.body;

  if (!req.body.image) return error(req, res, IMAGE_ERROR.NO_IMAGE);
  const { image } = req.body;

  const validateCollection = await dbFindOne<collection>(dbCollection, {
    _id: new ObjectId(collectionId),
    userId,
  });
  if (validateCollection === null) return error(req, res, IMAGE_ERROR.INVALID_COLLECTION);

  const existingImage = await dbFindOne<dbImage>(imagesCollection, { imageId: image.id });

  const existingImageCollections = existingImage?.collections.map(
    (collection) => collection.collectionId
  );
  if (existingImageCollections?.includes(collectionId))
    return error(req, res, IMAGE_ERROR.IMAGE_ALREADY_IN_COLLECTION);

  const dbResult =
    existingImage === null
      ? await dbInsertOne(imagesCollection, {
          imageId: image.id,
          collections: [{ collectionId, addedAt: Math.floor(Date.now() / 1000) }],
          image,
        } as dbImage)
      : await dbUpdateOne(
          imagesCollection,
          { imageId: image.id },
          {
            $push: {
              collections: { collectionId, addedAt: Math.floor(Date.now() / 1000) },
            },
          }
        );

  if (dbResult === null) return error(req, res, IMAGE_ERROR.ADD_IMAGE_FAILED);
  return result(req, res, { ...dbResult }, 1, 200);
}
