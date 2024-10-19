// lib/actions.ts
'use server';

import { connectToDB } from '@/lib/dbConnect';
import { ChauffeurModel } from '@/models/Chauffeur';
import { CompanyModel } from '@/models/Company';
import { JobModel } from '@/models/Job';

interface Stats {
  companyCount: number;
  chauffeurCount: number;
  jobCount: number;
}

export async function getCounts(): Promise<Stats> {
  try {
    await connectToDB();
    const [companyCount, chauffeurCount, jobCount] = await Promise.all([
      CompanyModel.countDocuments(),
      ChauffeurModel.countDocuments(),
      JobModel.countDocuments(),
    ]);

    return {
      companyCount,
      chauffeurCount,
      jobCount,
    };
  } catch (error) {
    console.error('Failed to get counts:', error);
    return {
      companyCount: 0,
      chauffeurCount: 0,
      jobCount: 0,
    };
  }
}
