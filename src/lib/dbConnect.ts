// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    // 0 = disconnected
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Adjust this value as needed
      socketTimeoutMS: 45000, // Adjust this value as needed
    });
    console.log('MongoDB connected');
  }
}
