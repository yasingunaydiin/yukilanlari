import { connectToDB } from '@/lib/dbConnect';
import { JobModel } from '@/models/Job';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { orgId } = req.query;

  try {
    await connectToDB();

    // Delete jobs associated with the organization
    const result = await JobModel.deleteMany({
      orgId: orgId as string,
    });

    if (!result.deletedCount) {
      return res
        .status(404)
        .json({ error: 'No jobs found for this organization.' });
    }

    return res
      .status(200)
      .json({ message: 'All associated jobs deleted successfully.' });
  } catch (err) {
    console.error('Error deleting jobs:', err);
    return res.status(500).json({ error: 'Failed to delete associated jobs.' });
  }
}
