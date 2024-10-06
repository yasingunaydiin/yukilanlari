import { JobModel } from '@/models/Job';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

export async function DELETE(reg: NextRequest) {
  const url = new URL(reg.url);
  const id = url.searchParams.get('id');
  await mongoose.connect(process.env.MONGO_URI as string);
  await JobModel.deleteOne({
    _id: id,
  });
  return Response.json(true);
}
