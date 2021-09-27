import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbDeleteOne, dbFind, dbInsertOne } from '../../utils/database';
import { error, result } from '../../utils/responses';

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
};
const dbCollection = 'collections';

export async function getCollections(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id } = req.auth;

  const dbResult = await dbFind(
    dbCollection,
    { userId: _id },
    { sortKey: 'createdAt', sortDirection: -1 }
  );
  return result(req, res, { ...dbResult }, 1, 200);
}

export async function addCollection(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id } = req.auth;

  if (!req.body.collectionName) return error(req, res, COLLECTION_ERROR.NO_COLLECTIONNAME);
  const { collectionName } = req.body;

  const dbResult = await dbInsertOne(dbCollection, {
    collectionName,
    userId: _id,
    createdAt: Math.floor(Date.now() / 1000),
  });
  if (dbResult === null) return error(req, res, COLLECTION_ERROR.ADD_COLLECTION_FAILED);
  return result(req, res, { ...dbResult }, 1, 201);
}

export async function deleteCollection(req: Request, res: Response): Promise<void> {
  if (!req.auth) return error(req, res, COLLECTION_ERROR.AUTH_FAILED);
  const { _id: userId } = req.auth;

  if (req.body.collectionId === undefined) return error(req, res, COLLECTION_ERROR.NO_COLLECTIONID);
  const { collectionId } = req.body;

  const dbResult = await dbDeleteOne(dbCollection, { userId, _id: new ObjectId(collectionId) });
  if (!dbResult || dbResult.deletedCount === 0)
    return error(req, res, COLLECTION_ERROR.DELETE_COLLECTION_FAILED);

  return result(req, res, { ...dbResult }, 1, 200);
}
