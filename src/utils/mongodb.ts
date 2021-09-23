import type { Collection } from 'mongodb';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
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
