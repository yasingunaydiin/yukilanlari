import { JobForm } from '@/app/components/JobForm';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListingForOrgPage(props: PageProps) {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) return 'Lütfen giriş yapın'; // Please log in

  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
  });

  // Check if user is a member of the specified organization
  const hasAccess = oms.data.some(
    (membership) => membership.organizationId === orgId
  );

  if (!hasAccess) {
    return 'Bu organizasyona erişim izniniz yok.'; // You do not have access to this organization
  }

  return <JobForm orgId={orgId} />;
}
