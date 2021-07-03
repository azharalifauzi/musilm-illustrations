import { MongoMemoryServer } from 'mongodb-memory-server'; // eslint-disable-line
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  process.env.NODE_ENV = 'test';
  process.env.JWT_KEY = 'jwtkeyfortest';
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('mongoose connected at ', mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  // eslint-disable-next-line
  for (let collection of collections) {
    await collection.deleteMany({}); // eslint-disable-line
  }
});

afterAll(async () => {
  const files = fs.readdirSync(path.join(__dirname, '../tmp'));

  files.forEach((val) => {
    if (!/index.md/i.test(val)) fs.unlinkSync(path.join(__dirname, '../tmp', val));
  });

  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    username: 'test',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`mi:session=${base64}`];
};
