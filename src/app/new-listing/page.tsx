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
import { Chauffeur, ChauffeurModel } from '@/models/Chauffeur';
import { Company, CompanyModel } from '@/models/Company';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import OrganizationIcon from '../components/CompanyChauffeurIcon';

interface NewListingPageProps {
  searchParams: {
    tab?: string;
  };
}

async function fetchCompanies(userId: string): Promise<Company[]> {
  return await CompanyModel.find({ createdBy: userId }).exec();
}

async function fetchChauffeurs(userId: string): Promise<Chauffeur[]> {
  return await ChauffeurModel.find({ createdBy: userId }).exec();
}

export default async function NewListingPage({
  searchParams,
}: NewListingPageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  if (!user) {
    return (
      <div className='container mt-6'>
        <Alert>
          <Link href={signInUrl}>
            <AlertDescription>
              İş veya sürücü ilanı oluşturmak için
              <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 w-12 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                Giriş
              </Button>
              yapın
            </AlertDescription>
          </Link>
        </Alert>
      </div>
    );
  }

  const fetchCompaniesData: Company[] = await fetchCompanies(user.id);

  const fetchChauffeursData: Chauffeur[] = await fetchChauffeurs(user.id);

  const activeTab = searchParams.tab === 'chauffeur' ? 'chauffeur' : 'company';

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === 'active'
  );

  const organizationsNames: { [key: string]: string } = {};
  const chauffeurNames: { [key: string]: string } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  for (const activeMembership of activeOrganizationMemberships) {
    const chauffeur = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    chauffeurNames[chauffeur.id] = chauffeur.name;
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
              Sürücü İlanı
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='company'>
          <Card>
            <CardHeader>
              <CardTitle>Şirketleriniz</CardTitle>
              <CardDescription>
                İlan yayınlamak için şirket profilinizi oluşturun ve{' '}
                <span className='pointer-events-none inline-flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10 hover:bg-yellow-100 transition-colors duration-300'>
                  Şirketinizi
                </span>{' '}
                seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fetchCompaniesData.length > 0 ? (
                <div className='space-y-2'>
                  {fetchCompaniesData.map((company) => (
                    <Link
                      key={company._id as string}
                      href={`/new-listing/company/${company.organizationId}`}
                      className='block'
                    >
                      <Button
                        variant='outline'
                        className='w-full justify-between'
                      >
                        <span className='flex items-center'>
                          <OrganizationIcon orgType='company' />
                          {company.newCompanyName}
                        </span>
                        <span className='flex items-center text-sm text-gray-500 group-hover:text-gray-700'>
                          İlan oluştur
                          <ChevronRight className='ml-1 h-4 w-4' />
                        </span>
                      </Button>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link href={'new-company'}>
                  <Alert variant='default'>
                    <AlertDescription>
                      Kullanıcınıza atanmış şirket bulunmuyor{' '}
                      <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 '>
                        Şirket Oluşturun
                      </Button>
                    </AlertDescription>
                  </Alert>
                </Link>
              )}
              <div className='mt-6'>
                <Link href='/new-company'>
                  <Button className='w-full bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold'>
                    Şirket oluşturun
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
              <CardTitle>Sürücüleriniz</CardTitle>
              <CardDescription>
                İlan yayınlamak için sürücü profilinizi oluşturun ve{' '}
                <span className='pointer-events-none inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10 '>
                  Sürücünüzü
                </span>{' '}
                seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fetchChauffeursData.length > 0 ? (
                <div className='space-y-2'>
                  {fetchChauffeursData.map((chauffeur) => (
                    <Link
                      key={chauffeur._id as string}
                      href={`/new-listing/chauffeur/${chauffeur.chauffeurId}`}
                      className='block'
                    >
                      <Button
                        variant='outline'
                        className='w-full justify-between'
                      >
                        <span className='flex items-center'>
                          <OrganizationIcon orgType='chauffeur' />
                          {chauffeur.newChauffeurName}{' '}
                        </span>
                        <span className='flex items-center text-sm text-gray-500 group-hover:text-gray-700'>
                          İlan oluştur
                          <ChevronRight className='ml-1 h-4 w-4' />
                        </span>
                      </Button>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link href={'new-chauffeur'}>
                  <Alert variant='default'>
                    <AlertDescription>
                      Kullanıcınıza atanmış şoför bulunmuyor{' '}
                      <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 '>
                        Şoför Oluşturun
                      </Button>
                    </AlertDescription>
                  </Alert>
                </Link>
              )}
              <div className='mt-6'>
                <Link href='/new-chauffeur'>
                  <Button className='w-full bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold'>
                    Şoför oluşturun
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
