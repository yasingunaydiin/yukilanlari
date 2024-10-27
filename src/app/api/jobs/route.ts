import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

// GET handler for loading more jobs
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    await mongoose.connect(process.env.MONGO_URI as string);
    const { user } = await withAuth();

    const rawJobs = await JobModel.find(
      {},
      {},
      {
        skip,
        limit,
        sort: '-createdAt',
      }
    ).lean();

    // Convert to plain objects to avoid Mongoose document issues
    const jobs = JSON.parse(JSON.stringify(rawJobs));

    const enrichedJobs = await addOrgAndUserData(jobs, user);
    return Response.json(enrichedJobs);
  } catch (error) {
    console.error('Error loading jobs:', error);
    return Response.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}

// Existing DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    await mongoose.connect(process.env.MONGO_URI as string);
    await JobModel.deleteOne({
      _id: id,
    });

    return Response.json(true);
  } catch (error) {
    console.error('Error deleting job:', error);
    return Response.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
