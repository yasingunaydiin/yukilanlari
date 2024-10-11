import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    // 0 = disconnected
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  }
}
