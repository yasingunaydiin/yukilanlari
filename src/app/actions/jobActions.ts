'use server';

import { JobModel } from '@/models/Job';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

export async function saveJobAction(data: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobDoc = await JobModel.create(Object.fromEntries(data));
  if ('orgId' in data) {
    revalidatePath('/jobs/' + data?.orgId);
  }
  return JSON.parse(JSON.stringify(jobDoc));
}
