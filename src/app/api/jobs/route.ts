import { NextRequest } from 'next/server';

// Dynamic imports to prevent build-time execution
const initializeRoute = async () => {
  const mongoose = (await import('mongoose')).default;
  const { withAuth } = await import('@workos-inc/authkit-nextjs');
  const { JobModel, addOrgAndUserData } = await import('@/models/Job');

  const connectDB = async () => {
    try {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGO_URI as string);
      }
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw new Error('Failed to connect to database');
    }
  };

  return {
    mongoose,
    withAuth,
    JobModel,
    addOrgAndUserData,
    connectDB,
  };
};

// GET handler
export async function GET(req: NextRequest) {
  try {
    const { withAuth, JobModel, addOrgAndUserData, connectDB } =
      await initializeRoute();

    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    await connectDB();
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

    const jobs = JSON.parse(JSON.stringify(rawJobs));
    const enrichedJobs = await addOrgAndUserData(jobs, user);

    return Response.json(enrichedJobs);
  } catch (error) {
    console.error('Error loading jobs:', error);
    return Response.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(req: NextRequest) {
  try {
    const { JobModel, connectDB } = await initializeRoute();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Job ID is required' }, { status: 400 });
    }

    await connectDB();
    await JobModel.deleteOne({ _id: id });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return Response.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
