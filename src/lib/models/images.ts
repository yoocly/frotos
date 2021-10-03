import type { Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import { ObjectId } from 'mongodb';
import fetch from 'node-fetch';
import { dbFindOne, dbUpdateOne, dbUpsertOne, getCollection } from '../../utils/database';
import fetchJSONsAsync from '../../utils/fetchJSONsAsync';
import { error, result } from '../../utils/responses';
import type { dbCollection } from '../types/collection';
import type { imageAPIResult } from '../types/externals';
import type {
  apiColorKeys,
  apiNames,
  castedImage,
  dbImage,
  filtersAspectRatio,
  image,
  imagesResult,
} from '../types/image';
import { apiColorMap, apis } from '../types/image';
import appPath from 'app-root-path';
import sharp from 'sharp';
import type { downloadImageOptions } from '../../app/lib/download';

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
  INVALID_IMAGE: { resultCode: 507, httpCode: 400, description: 'No valid image' },
  IMAGE_NOT_IN_COLLECTION: {
    resultCode: 508,
    httpCode: 400,
    description: 'The image is not in this collection',
  },
  DOWNLOAD_FROM_SERVER_FAILED: {
    resultCode: 509,
    httpCode: 500,
    description: 'Image download from server failed',
  },
};
const imagesCollection = 'images';
const collectionsCollection = 'collections';

export async function images(req: Request, res: Response): Promise<void> {
  const { query, page, aspectRatio, color } = req.params;

  const requests = apis.map(({ url, key, aspectRatios, name }) => {
    const orientation = aspectRatios[aspectRatio as filtersAspectRatio];
    const apiName = name as apiNames;
    const apiColor =
      color in apiColorMap ? apiColorMap[color as apiColorKeys][apiName] : 'allcolors';

    if (orientation === 'noRequest') return { url: '', key };
    if (color === 'noRequest' || apiColor === 'noRequest') return { url: '', key };

    return {
      url: url
        .replace(`{query}`, query)
        .replace(`{page}`, page)
        .replace(`{aspectRatio}`, aspectRatios[aspectRatio as filtersAspectRatio])
        .replace(`{color}`, apiColor)
        .replace(`&orientation=&`, `&`)
        .replace(`&color=allcolors`, ``)
        .replace(`&colors=allcolors`, ``),
      key,
    };
  });

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
  if (!userId) return error(req, res, IMAGE_ERROR.AUTH_FAILED);

  const collectionId = !req.body.collectionId
    ? await getRecentCollectionId(userId)
    : req.body.collectionId;
  if (!collectionId) return error(req, res, IMAGE_ERROR.NO_COLLECTIONID);

  if (!req.body.image) return error(req, res, IMAGE_ERROR.NO_IMAGE);
  const { image } = req.body;

  const dbResultUpsertImage = await dbUpsertOne(
    imagesCollection,
    { imageId: image.id },
    {
      $set: {
        imageId: image.id,
        image,
      } as dbImage,
    }
  );

  if (
    dbResultUpsertImage === null ||
    !(dbResultUpsertImage.matchedCount === 1 || dbResultUpsertImage.upsertedCount === 1)
  )
    return error(req, res, IMAGE_ERROR.ADD_IMAGE_FAILED);

  const collection = await dbFindOne<dbCollection>(collectionsCollection, {
    _id: new ObjectId(collectionId),
    userId,
  });
  if (collection === null) return error(req, res, IMAGE_ERROR.INVALID_COLLECTION);
  if (collection.images.includes(image.id))
    return error(req, res, IMAGE_ERROR.IMAGE_ALREADY_IN_COLLECTION);

  const dbResultUpdateCollection = await dbUpdateOne(
    collectionsCollection,
    { _id: new ObjectId(collectionId) },
    {
      $push: {
        images: image.id,
      },
    }
  );
  if (dbResultUpdateCollection === null || dbResultUpdateCollection.matchedCount !== 1)
    return error(req, res, IMAGE_ERROR.ADD_IMAGE_FAILED);

  return result(req, res, { collectionId, collectionName: collection.collectionName }, 1, 201);
}

export async function getImage(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, IMAGE_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  const { imageId } = req.params;

  const dbResult = await getCollection(imagesCollection)
    .aggregate([
      {
        $match: {
          imageId,
        },
      },
      {
        $lookup: {
          from: 'collections',
          as: 'collectionsList',
          let: { imageId: '$imageId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$userId', userId] }, { $in: ['$$imageId', '$images'] }],
                },
              },
            },
          ],
        },
      },
    ])
    .toArray();

  if (dbResult === null || Object.keys(dbResult).length !== 1)
    return error(req, res, IMAGE_ERROR.INVALID_IMAGE);

  return result(req, res, dbResult[0], 1, 200);
}

export async function deleteImage(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, IMAGE_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  if (!req.body.collectionId) return error(req, res, IMAGE_ERROR.NO_COLLECTIONID);
  const { collectionId } = req.body;

  if (!req.body.imageId) return error(req, res, IMAGE_ERROR.NO_IMAGE);
  const { imageId } = req.body;

  const collection = await dbFindOne<dbCollection>(collectionsCollection, {
    _id: new ObjectId(collectionId),
    userId,
  });
  if (collection === null) return error(req, res, IMAGE_ERROR.INVALID_COLLECTION);
  if (!collection.images.includes(imageId))
    return error(req, res, IMAGE_ERROR.IMAGE_NOT_IN_COLLECTION);

  const dbResultUpdateCollection = await dbUpdateOne(
    collectionsCollection,
    { _id: new ObjectId(collectionId) },
    {
      $pull: {
        images: imageId,
      },
    }
  );
  if (dbResultUpdateCollection === null || dbResultUpdateCollection.matchedCount !== 1)
    return error(req, res, IMAGE_ERROR.DELETE_IMAGE_FAILED);

  return result(req, res, { ...dbResultUpdateCollection }, 1, 200);
}

async function getRecentCollectionId(userId: string): Promise<string | null> {
  const dbResult = await getCollection(collectionsCollection)
    .aggregate([
      {
        $match: {
          userId,
        },
      },
      { $sort: { lastChangeAt: -1 } },
      { $limit: 1 },
    ])
    .toArray();

  if (dbResult === null) return null;
  if (dbResult.length < 1) return null;

  const recentCollection = dbResult[0] as dbCollection;
  return recentCollection._id || null;
}

export async function downloadImage(req: Request, res: Response): Promise<void> {
  if (!req.body.image) return error(req, res, IMAGE_ERROR.NO_IMAGE);
  const { image, options } = req.body;
  const localFile = `${appPath.path}/image.${options.format}`;

  if (!(await downloadFileToServer(image.preview, localFile, options)))
    error(req, res, IMAGE_ERROR.DOWNLOAD_FROM_SERVER_FAILED);

  res.download(localFile);
}

async function downloadFileToServer(
  url: string,
  localFile: string,
  options: downloadImageOptions
): Promise<boolean> {
  try {
    const { format } = options;

    const response = await fetch(url);
    if (!response.ok) return false;

    const serverBuffer = await response.buffer();

    const formatBuffer =
      format === 'png'
        ? await sharp(serverBuffer).png().toBuffer()
        : format === 'jpg'
        ? await sharp(serverBuffer).jpeg().toBuffer()
        : format === 'webp'
        ? await sharp(serverBuffer).webp().toBuffer()
        : format === 'avif'
        ? await sharp(serverBuffer).avif().toBuffer()
        : serverBuffer;

    await writeFile(localFile, formatBuffer);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
