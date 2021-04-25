import { MongoMemoryServer } from 'mongodb-memory-server'; // eslint-disable-line
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  process.env.NODE_ENV = 'test';
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
