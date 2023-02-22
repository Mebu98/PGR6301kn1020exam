import dotenv from "dotenv";
import express from "express";
import bodyParser from "express";
import cookieParser from "cookie-parser";
import {MongoClient} from "mongodb";

export function configureExpress() {
  dotenv.config();
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  return app;
}

export async function configureMongoDb() {
  const mongodbUrl = process.env.MONGODB_URL;

  const mongoClient = new MongoClient(mongodbUrl);
  await mongoClient.connect();
  const mongoDatabase = mongoClient.db(process.env.MONGOD_TEST_DATABASE || "PG6301ExamTEST");

  // Clear the database
  await mongoDatabase.collection("users").deleteMany({});
  await mongoDatabase.collection("activities").deleteMany({});

  return { client: mongoClient, database: mongoDatabase };
}

