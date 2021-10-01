import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbDeleteOne, dbInsertOne, getCollection } from '../../utils/database';
import { error, result } from '../../utils/responses';
import type { dbCollection } from '../types/collection';

export const COLLECTION_ERROR = {
  AUTH_FAILED: { resultCode: 403, httpCode: 401, description: 'Authentication failed' },
  NO_COLLECTIONNAME: { resultCode: 501, httpCode: 400, description: 'No collection name' },
  NO_COLLECTIONID: { resultCode: 502, httpCode: 400, description: 'No collection id' },
  ADD_COLLECTION_FAILED: {
    resultCode: 503,
    httpCode: 503,
    description: 'Failed to add collection',
  },
  DELETE_COLLECTION_FAILED: {
    resultCode: 504,
    httpCode: 500,
    description: 'Failed to delete collection',
  },
  ACEESS_COLLECTION_FAILED: {
    resultCode: 505,
    httpCode: 500,
    description: 'Failed to access collection',
  },
};
const collectionsCollection = 'collections';

export async function getCollections(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  const dbResult = await getCollection(collectionsCollection)
    .aggregate([
      {
        $match: {
          userId,
        },
      },
      { $sort: { lastChangeAt: -1 } },
      { $addFields: { imageCount: { $size: '$images' } } },
      { $addFields: { lastImageId: { $slice: ['$images', -1] } } },
      {
        $lookup: {
          from: 'images',
          localField: 'lastImageId',
          foreignField: 'imageId',
          as: 'lastImage',
        },
      },
    ])
    .toArray();

  return result(req, res, dbResult, 1, 200);
}

export async function addCollection(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id } = req.auth;

  if (!req.body.collectionName) return error(req, res, COLLECTION_ERROR.NO_COLLECTIONNAME);
  const { collectionName } = req.body;

  const dbResult = await dbInsertOne(collectionsCollection, {
    collectionName,
    userId: _id,
    lastChangeAt: Math.floor(Date.now() / 1000),
    images: [],
  } as dbCollection);
  if (dbResult === null) return error(req, res, COLLECTION_ERROR.ADD_COLLECTION_FAILED);
  return result(req, res, { ...dbResult }, 1, 201);
}

export async function deleteCollection(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  if (req.body.collectionId === undefined) return error(req, res, COLLECTION_ERROR.NO_COLLECTIONID);
  const { collectionId } = req.body;

  const dbResult = await dbDeleteOne(collectionsCollection, {
    userId,
    _id: new ObjectId(collectionId),
  });
  if (!dbResult || dbResult.deletedCount === 0)
    return error(req, res, COLLECTION_ERROR.DELETE_COLLECTION_FAILED);

  return result(req, res, { ...dbResult }, 1, 200);
}

export async function getCollectionImages(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  const { collectionId } = req.params;

  const dbResult = await getCollection(collectionsCollection)
    .aggregate([
      {
        $match: {
          userId,
          _id: new ObjectId(collectionId),
        },
      },
      { $set: { images: { $reverseArray: '$images' } } },
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: 'imageId',
          as: 'imagesList',
        },
      },
      { $unset: 'imagesList._id' },
      { $unset: 'imagesList.imageId' },
    ])
    .toArray();

  if (dbResult === null || Object.keys(dbResult).length === 0)
    return error(req, res, COLLECTION_ERROR.ACEESS_COLLECTION_FAILED);

  return result(req, res, dbResult[0], 1, 200);
}
