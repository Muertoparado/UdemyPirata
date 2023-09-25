import dotenv from 'dotenv'
import {MongoClient} from 'mongodb';
dotenv.config(); 
export async function con() {
  try {
    const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@prueba.tuhkln0.mongodb.net/`;
    const client = await MongoClient.connect(uri);
    return client.db(`${process.env.ATLAS_DB}`);
  } catch (error) {
    return {status: 500, message: error}, Promise.reject(error);;
  }
}