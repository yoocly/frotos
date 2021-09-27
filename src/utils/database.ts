import dotenv from 'dotenv';
import type { Collection, DeleteResult, Filter, InsertOneResult, SortDirection } from 'mongodb';
import { MongoClient } from 'mongodb';
dotenv.config();

let client: MongoClient;

export async function connectDb(): Promise<void> {
  if (!process.env.DB_URI) throw new Error('No DB_URI in the .env found');
  client = new MongoClient(process.env.DB_URI);
  try {
    await client.connect();
  } catch (error) {
    throw new Error(`Database connection failed: ${error}`);
  }
}

export function getCollection<T>(collectionName: string): Collection<T> {
  return client.db().collection<T>(collectionName);
}

export async function dbInsertOne<T>(
  collectionName: string,
  payload: T,
  assertionCallback: (payload: T) => boolean = () => true
): Promise<InsertOneResult<T> | null> {
  if (!assertionCallback(payload)) {
    console.error(`DB Error in dbInsertOne: Assertion failed --- Payload: ${payload}`);
    return null;
  }

  try {
    return await getCollection(collectionName).insertOne(payload);
  } catch (error) {
    console.error(`DB Error in dbInsertOne: ${error} --- Payload: ${payload}`);
    return null;
  }
}

export async function dbFindOne<T>(
  collectionName: string,
  filter: Filter<unknown>
): Promise<T | null> {
  try {
    const result = await getCollection<T>(collectionName).findOne(filter);
    return result;
  } catch (error) {
    console.error(`DB Error in dbFindOne: ${error} --- Filter: ${filter}`);
    return null;
  }
}

export async function dbFind<T>(
  collectionName: string,
  filter: Filter<unknown>,
  options: { sortKey?: string; sortDirection?: SortDirection; limit?: number } = {}
): Promise<T[] | null> {
  try {
    const findResult = getCollection<T>(collectionName).find(filter);
    const sortedResult = options.sortKey
      ? findResult.sort(options.sortKey, options.sortDirection)
      : findResult;
    const limitedResult = options.limit ? sortedResult.limit(options.limit) : sortedResult;
    const result = await limitedResult.toArray();
    return result;
  } catch (error) {
    console.error(`DB Error in dbFind: ${error} --- Filter: ${filter}`);
    return null;
  }
}

export async function dbDeleteOne(
  collectionName: string,
  filter: Filter<unknown>
): Promise<DeleteResult | null> {
  try {
    const result = await getCollection(collectionName).deleteOne(filter);
    return result;
  } catch (error) {
    console.error(`DB Error in dbFindOne: ${error} --- Filter: ${filter}`);
    return null;
  }
}
