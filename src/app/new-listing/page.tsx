import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import OrganizationIcon from '../components/CompanyTruckerIcon';

interface NewListingPageProps {
  searchParams: {
    tab?: string; // The tab parameter in the query string
  };
}

export default async function NewListingPage({
  searchParams,
}: NewListingPageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await withAuth();

  if (!user) {
    return (
      <div className='container mt-6'>
        <Alert>
          <AlertDescription>
            İş ilanı veya sürücü ilanı oluşturmak için giriş yapın
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Determine the active tab from the search parameters
  const activeTab = searchParams.tab === 'chauffeur' ? 'chauffeur' : 'company';

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === 'active'
  );

  const organizationsNames: { [key: string]: string } = {};
  const truckerNames: { [key: string]: string } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  for (const activeMembership of activeOrganizationMemberships) {
    const trucker = await workos.organizations.getOrganization(
      activeMembership.organizationId // Keep organizationId
    );
    truckerNames[trucker.id] = trucker.name;
  }

  return (
    <div className='container max-w-2xl mx-auto py-8'>
      <Tabs defaultValue={activeTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='company'>
            <Link
              href={{ pathname: '/new-listing', query: { tab: 'company' } }}
            >
              Şirket İlanı
            </Link>
          </TabsTrigger>
          <TabsTrigger value='chauffeur'>
            <Link
              href={{ pathname: '/new-listing', query: { tab: 'chauffeur' } }}
            >
              Sürücü Reklamı
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='company'>
          <Card>
            <CardHeader>
              <CardTitle>Şirketleriniz</CardTitle>
              <CardDescription>
                İlan oluşturmak için bir şirket seç veya yeni bir şirket
                oluştur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(organizationsNames).length > 0 ? (
                <div className='space-y-2'>
                  {Object.entries(organizationsNames).map(
                    ([orgId, orgName]) => (
                      <Link
                        key={orgId}
                        href={`/new-listing/${orgId}`}
                        className='block'
                      >
                        <Button
                          variant='outline'
                          className='w-full justify-between'
                        >
                          <span className='flex items-center'>
                            <OrganizationIcon orgType='company' />
                            {orgName}
                          </span>
                          <ArrowRight className='h-4 w-4' />
                        </Button>
                      </Link>
                    )
                  )}
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
        </TabsContent>
        <TabsContent value='chauffeur'>
          <Card>
            <CardHeader>
              <CardTitle>Sürücü Reklamı Oluştur</CardTitle>
              <CardDescription>
                Kendinizi tanıtın ve iş fırsatlarını yakalayın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(truckerNames).length > 0 ? (
                <div className='space-y-2'>
                  {Object.entries(truckerNames).map(
                    ([truckerId, truckerName]) => (
                      <Link
                        key={truckerId}
                        href={`/new-listing/${truckerId}`}
                        className='block'
                      >
                        <Button
                          variant='outline'
                          className='w-full justify-between'
                        >
                          <span className='flex items-center'>
                            <OrganizationIcon orgType='chauffeur' />
                            {truckerName}
                          </span>
                          <ArrowRight className='h-4 w-4' />
                        </Button>
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <Alert variant='default'>
                  <AlertDescription>
                    Kullanıcınıza atanmış sürücü bulunmuyor
                  </AlertDescription>
                </Alert>
              )}
              <div className='mt-6'>
                <Link href='/new-trucker'>
                  <Button className='w-full'>
                    Sürücü oluştur
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
