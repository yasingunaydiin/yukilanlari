import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// GET handler for loading more jobs
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    await mongoose.connect(process.env.MONGO_URI as string);
    const { user } = await withAuth();

    const jobs = await addOrgAndUserData(
      await JobModel.find(
        {},
        {},
        {
          skip,
          limit,
          sort: '-createdAt',
        }
      ),
      user
    );

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error loading jobs:', error);
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}

// Existing DELETE handler
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  await mongoose.connect(process.env.MONGO_URI as string);
  await JobModel.deleteOne({
    _id: id,
  });

  return NextResponse.json(true); //Changed from Response to NextResponse
}
