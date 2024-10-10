import { connectToDB } from '@/lib/dbConnect';
import { CompanyModel } from '@/models/Company';
import { JobModel } from '@/models/Job';
import { TruckerModel } from '@/models/Trucker'; // Add this import
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

    // 3. Delete the associated companies from MongoDB using `organizationId`
    const resultCompanyDeletion = await CompanyModel.deleteMany({
      organizationId: organizationId,
    });
    console.log(
      `Deleted ${resultCompanyDeletion.deletedCount} companies from MongoDB for orgId: ${organizationId}`
    );

    // 4. Delete the associated truckers from MongoDB using `truckerId`
    const resultTruckerDeletion = await TruckerModel.deleteMany({
      truckerId: organizationId, // Ensure truckerId is used correctly here
    });
    console.log(
      `Deleted ${resultTruckerDeletion.deletedCount} truckers from MongoDB for truckerId: ${organizationId}`
    );

    // 5. Return success response with counts
    return NextResponse.json({
      message: `Organization deleted successfully along with ${resultJobDeletion.deletedCount} associated jobs, ${resultCompanyDeletion.deletedCount} associated companies, and ${resultTruckerDeletion.deletedCount} associated truckers.`,
    });
  } catch (error) {
    console.error('Error during deletion:', error);
    return NextResponse.json(
      {
        error:
          'Failed to delete organization and associated jobs/companies/truckers.',
      },
      { status: 500 }
    );
  }
}
