import { connectToDB } from '@/lib/dbConnect';
import { CompanyModel } from '@/models/Company';
import { JobModel } from '@/models/Job';
import { WorkOS } from '@workos-inc/node';
import { NextResponse } from 'next/server';

// Initialize WorkOS
const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const organizationId = params.id;

  if (!organizationId) {
    return NextResponse.json(
      { error: 'Invalid organization ID' },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectToDB();

    // 1. Delete the organization from WorkOS
    await workos.organizations.deleteOrganization(organizationId);
    console.log(`Organization ${organizationId} deleted from WorkOS`);

    // 2. Delete the associated jobs from MongoDB using `orgId`
    const resultJobDeletion = await JobModel.deleteMany({
      orgId: organizationId,
    });
    console.log(
      `Deleted ${resultJobDeletion.deletedCount} jobs from MongoDB for orgId: ${organizationId}`
    );

    // 3. Delete the associated companies from MongoDB using `orgId`
    const resultCompanyDeletion = await CompanyModel.deleteMany({
      organizationId: organizationId,
    });
    console.log(
      `Deleted ${resultCompanyDeletion.deletedCount} companies from MongoDB for orgId: ${organizationId}`
    );

    // 4. Return success response with counts
    return NextResponse.json({
      message: `Organization deleted successfully along with ${resultJobDeletion.deletedCount} associated jobs and ${resultCompanyDeletion.deletedCount} associated companies.`,
    });
  } catch (error) {
    console.error('Error during deletion:', error);
    return NextResponse.json(
      { error: 'Failed to delete organization and associated jobs/companies.' },
      { status: 500 }
    );
  }
}
