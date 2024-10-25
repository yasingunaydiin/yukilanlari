'use server';

import { JobModel } from '@/models/Job';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);

  const { id, ...jobData } = Object.fromEntries(formData);

  // Add profile type based on the form's origin
  const enrichedJobData = {
    ...jobData,
    profileType: formData.get('profileType') || 'company', // defaults to 'company' if not specified
  };

  const jobInfo = id
    ? await JobModel.findByIdAndUpdate(id, enrichedJobData)
    : await JobModel.create(enrichedJobData);

  if ('orgId' in jobData) {
    revalidatePath('/jobs/' + jobData.orgId);
  }

  return JSON.parse(JSON.stringify(jobInfo));
}
