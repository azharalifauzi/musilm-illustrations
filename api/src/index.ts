import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { User } from './models/user-model';

dotenv.config();

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (error) {
    console.error(error);
  }

  const users = await User.find({});

  if (users.length === 0) {
    console.log('Creating Admin');

    if (!process.env.ADMIN_USERNAME) {
      throw new Error('ADMIN_USERNAME must be defined');
    }

    if (!process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_PASSWORD must be defined');
    }

    try {
      const admin = User.build({
        username: process.env.ADMIN_USERNAME!,
        password: process.env.ADMIN_PASSWORD!,
      });

      await admin.save();
    } catch (error) {
      console.error(error);
    }

    console.log('Admin Successfully Created');
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log('Listening to port ', PORT);
  });
};

start();
