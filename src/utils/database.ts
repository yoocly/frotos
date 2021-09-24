import dotenv from 'dotenv';
import type { Collection, InsertOneResult } from 'mongodb';
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
    console.error(`DB Error in dbInsertOne: Clear password found! --- Payload: ${payload}`);
    return null;
  }

  try {
    return await getCollection(collectionName).insertOne(payload);
  } catch (error) {
    console.error(`DB Error in dbInsertOne: ${error} --- Payload: ${payload}`);
    return null;
  }
}

export async function dbFindOne<T>(collectionName: string, filter: unknown): Promise<T | null> {
  try {
    return (await getCollection(collectionName).findOne({ filter })) as T | null;
  } catch (error) {
    console.error(`DB Error in dbFindOne: ${error} --- Filter: ${filter}`);
    return null;
  }
}
