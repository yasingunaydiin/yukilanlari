import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

export default async function NewListingPage() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await withAuth();

  if (!user) {
    return (
      <div className='container mt-6'>
        <Alert>
          <AlertDescription>İş ilanı vermek için giriş yapın</AlertDescription>
        </Alert>
      </div>
    );
  }

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === 'active'
  );

  const organizationsNames: { [key: string]: string } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  return (
    <div className='container max-w-2xl mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Şirketleriniz</CardTitle>
          <CardDescription>İş oluşturmak için bir şirket seçin</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(organizationsNames).length > 0 ? (
            <div className='space-y-2'>
              {Object.entries(organizationsNames).map(([orgId, orgName]) => (
                <Link
                  key={orgId}
                  href={`/new-listing/${orgId}`}
                  className='block'
                >
                  <Button variant='outline' className='w-full justify-between'>
                    <span className='flex items-center'>
                      <Building2 className='mr-2 h-4 w-4' />
                      {orgName}
                    </span>
                    <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>
              ))}
            </div>
          ) : (
            <Alert variant='default'>
              <AlertDescription>
                Kullanıcınıza atanmış şirket bulunmuyor
              </AlertDescription>
            </Alert>
          )}
          <div className='mt-6'>
            <Link href='/new-company'>
              <Button className='w-full'>
                Şirket oluştur
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
