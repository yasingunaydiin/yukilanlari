import { ChauffeurJobForm } from '@/app/components/ChauffeurJobForm';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import Link from 'next/link';

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListingForOrgPage(props: PageProps) {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user)
    return (
      <div className='container mt-6'>
        <Alert>
          <Link href={signInUrl}>
            <AlertDescription>
              <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 w-12 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                Giriş
              </Button>
              yapın
            </AlertDescription>
          </Link>
        </Alert>
      </div>
    ); // Please log in

  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
  });

  // Check if user is a member of the specified organization
  const hasAccess = oms.data.some(
    (membership) => membership.organizationId === orgId
  );

  if (!hasAccess) {
    return (
      <div className='container mt-6'>
        <Alert>
          <AlertDescription>
            Bu organizasyona erişim izniniz yok.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <ChauffeurJobForm orgId={orgId} />;
}
