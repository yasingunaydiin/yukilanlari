// actions/workosActions.ts and companyactions.ts

'use server';
import { connectToDB } from '@/lib/dbConnect'; // Import the database connection
import { CompanyModel } from '@/models/Company'; // Import the Company model
import { TruckerModel } from '@/models/Trucker';
import { WorkOS } from '@workos-inc/node';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function createCompany(
  companyName: string,
  newCompanyContactName: string,
  newCompanyPhone: string,
  newCompanyEmail: string,
  newCompanyLocation: string,
  newCompanyWebsite: string,
  newCompanySocialFacebook: string,
  userId: string
) {
  // Connect to MongoDB
  await connectToDB();

  // Create the organization in WorkOS
  const org = await workos.organizations.createOrganization({
    name: companyName,
  });

  // Create a membership for the user in the organization
  await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: 'admin',
  });

  // Create a new company document in MongoDB
  const newCompany = new CompanyModel({
    newCompanyContactName: newCompanyContactName,
    newCompanyPhone: newCompanyPhone,
    newCompanyEmail: newCompanyEmail,
    newCompanyLocation: newCompanyLocation,
    newCompanyWebsite: newCompanyWebsite,
    newCompanySocialFacebook: newCompanySocialFacebook,
    organizationId: org.id, // Add this line to save the WorkOS organization ID
  });

  // Save the company details to MongoDB
  await newCompany.save();

  // Revalidate the path and redirect the user
  revalidatePath('/new-listing');
  redirect('/new-listing');
}

export async function createTrucker(
  truckerName: string,
  newTruckerContactName: string,
  newTruckerPhone: string,
  newTruckerEmail: string,
  newTruckerLocation: string,
  newTruckerWebsite: string,
  newTruckerSocialFacebook: string,
  userId: string
) {
  // Connect to MongoDB
  await connectToDB();

  // Create the organization in WorkOS (use the truckerName as organization name)
  const org = await workos.organizations.createOrganization({
    name: truckerName,
  });

  // Create a membership for the user in the organization
  await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: 'admin',
  });

  // Create a new trucker document in MongoDB
  const newTrucker = new TruckerModel({
    newTruckerContactName: newTruckerContactName,
    newTruckerPhone: newTruckerPhone,
    newTruckerEmail: newTruckerEmail,
    newTruckerLocation: newTruckerLocation,
    newTruckerWebsite: newTruckerWebsite,
    newTruckerSocialFacebook: newTruckerSocialFacebook,
    truckerId: org.id, // Save the WorkOS organization ID as truckerId
  });

  // Save the trucker details to MongoDB
  await newTrucker.save();

  // Revalidate the path and redirect the user
  revalidatePath('/new-listing');
  redirect('/new-listing');
}
