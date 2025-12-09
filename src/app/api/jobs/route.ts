import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const MONGO_URI = process.env.MONGO_URI as string;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGO_URI);
    }
    
    const { user } = await withAuth(); 

    const jobs = await addOrgAndUserData(
      await JobModel.find({}, {}, { skip, limit, sort: '-createdAt' }),
      user
    );

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error loading jobs:', error);
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGO_URI);
    }

    await JobModel.deleteOne({ _id: id });
    return NextResponse.json(true);
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
