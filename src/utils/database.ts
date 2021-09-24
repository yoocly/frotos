import type { Collection, InsertOneResult } from 'mongodb';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export type dbResult<dbActionType, payload> = Promise<{
  status: number;
  response: {
    result?: dbActionType;
    error?: unknown;
    payload: payload;
  };
}>;

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
  payload: T,
  assertionCallback: (payload: T) => string | boolean = () => true
): dbResult<InsertOneResult, T> {
  const assertionResult = assertionCallback(payload);
  if (assertionResult !== true)
    return { status: 500, response: { error: assertionResult, payload } };

  try {
    const result = await getCollection('users').insertOne(payload);
    return { status: 201, response: { result, payload } };
  } catch (error) {
    console.log(payload);
    return { status: 500, response: { error, payload } };
  }
}
