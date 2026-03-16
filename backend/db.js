import { MongoClient } from 'mongodb';
import 'dotenv/config';

const url = process.env.MONGO_URL;
let dbConnection;

export const connectToDb = async () => {
  const client = new MongoClient(url);
  await client.connect();
  dbConnection = client.db();
};

export const getDb = () => {
  return dbConnection;
};
