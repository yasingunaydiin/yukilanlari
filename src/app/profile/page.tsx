import { connectToDB } from '@/lib/dbConnect';
import { ChauffeurModel } from '@/models/Chauffeur';
import { CompanyModel } from '@/models/Company';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Facebook,
  Globe,
  Mail,
  Map,
  Phone,
  TruckIcon,
  User,
} from 'lucide-react';
import Link from 'next/link';
import DeleteOrganization from '../components/DeleteOrganization';
import SkeletonLoader from '../components/SkeletonLoader';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default async function CompanyListPage() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  if (!user) {
    return (
      <div className='container mt-6'>
        <Alert>
          <Link href={signInUrl}>
            <AlertDescription>
              İş veya sürücü ilanlarınızı görmek için
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

  let companies = [];
  let chauffeurs = [];

  try {
    await connectToDB();

    const mongoCompanies = await CompanyModel.find({
      createdBy: user.id,
    }).lean();

    const mongoChauffeurs = await ChauffeurModel.find({
      createdBy: user.id,
    }).lean();

    // Map companies with their stored names
    companies = mongoCompanies.map((mongoCompany) => ({
      id: String(mongoCompany._id),
      organizationName: mongoCompany.newCompanyName,
      contactName: mongoCompany.newCompanyContactName,
      organizationId: mongoCompany.organizationId,
      phone: mongoCompany.newCompanyPhone,
      email: mongoCompany.newCompanyEmail,
      location: mongoCompany.newCompanyLocation,
      website: mongoCompany.newCompanyWebsite,
      socialFacebook: mongoCompany.newCompanySocialFacebook,
    }));

    // Map chauffeurs with their stored names
    chauffeurs = mongoChauffeurs.map((mongoChauffeur) => ({
      id: String(mongoChauffeur._id),
      chauffeurName: mongoChauffeur.newChauffeurName,
      contactName: mongoChauffeur.newChauffeurContactName,
      chauffeurId: mongoChauffeur.chauffeurId,
      phone: mongoChauffeur.newChauffeurPhone,
      email: mongoChauffeur.newChauffeurEmail,
      location: mongoChauffeur.newChauffeurLocation,
      website: mongoChauffeur.newChauffeurWebsite,
      socialFacebook: mongoChauffeur.newChauffeurSocialFacebook,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <p>Veriler getirilirken hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
    );
  }

  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <Card className='p-4'>
        <a href='mailto:yukilanlarinet@gmail.com?subject=Veri%20Silme%20Talebi'>
          <p>
            Verilerinizin tamamen silinmesini istiyorsanız,
            <span className='p-1'>
              <button className='inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors duration-300'>
                buraya tıklayarak
              </button>
            </span>
            bize e-posta gönderin.
          </p>
        </a>
      </Card>

      <ul className='space-y-4 m-5'>
        <h1 className='text-3xl font-bold'>Şirketleriniz</h1>
        {companies.length > 0 ? (
          companies.map((company) => (
            <Card key={company.id} className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Building2 />
                  <Link href={`/jobs/${company.organizationId}`}>
                    <div className='flex gap-2'>
                      <h1 className='text-xl font-bold cursor-pointer'>
                        <SkeletonLoader>
                          {company.organizationName}
                        </SkeletonLoader>
                      </h1>
                      <span className='flex items-center text-sm text-gray-500 group-hover:text-gray-700'>
                        Tüm ilanları göster
                        <ChevronRight className='ml-1 h-4 w-4' />
                      </span>
                    </div>
                  </Link>
                </div>
                <div className='flex gap-2'>
                  {/* <button className='inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors duration-300'>
                    <Edit2 className='size-3' />
                    Düzenle
                  </button> */}
                  <DeleteOrganization
                    organizationId={company.organizationId}
                    isAdmin={true}
                    orgType='company'
                  />
                </div>
              </div>
              <div className='flex items-center m-2'>
                <User className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{company.contactName}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Mail className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{company.email}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Phone className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{company.phone}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Map className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{company.location}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Globe className='w-5 h-5 mr-2 text-muted-foreground' />
                {company.website ? (
                  <a
                    href={company.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <SkeletonLoader>{company.website}</SkeletonLoader>
                  </a>
                ) : (
                  'Websitesi Yok'
                )}
              </div>
              <div className='flex items-center  m-2'>
                <Facebook className='w-5 h-5 mr-2 text-muted-foreground' />
                {company.socialFacebook ? (
                  <a
                    href={company.socialFacebook}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <SkeletonLoader>{company.socialFacebook}</SkeletonLoader>
                  </a>
                ) : (
                  'Facebook Sayfasi Yok'
                )}
              </div>
              <div className='mt-6'>
                <Link href='/new-chauffeur'>
                  <Button className='w-full bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold'>
                    Şoför oluşturun
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <Alert>
            <AlertDescription>
              Şirketler oluşturmadınız.
              <Button className='m-1 text-orange-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                <Link href={'new-company'}>Şirket Oluşturun</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </ul>

      <ul className='space-y-4 m-5'>
        <h1 className='text-3xl font-bold'>Sürücüleriniz</h1>
        {chauffeurs.length > 0 ? (
          chauffeurs.map((chauffeur) => (
            <Card key={chauffeur.id} className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <TruckIcon />
                  <Link href={`/jobs/${chauffeur.chauffeurId}`}>
                    <div className='flex gap-2'>
                      <h1 className='text-xl font-bold cursor-pointer'>
                        <SkeletonLoader>
                          {chauffeur.chauffeurName}
                        </SkeletonLoader>
                      </h1>
                      <span className='flex items-center text-sm text-gray-500 group-hover:text-gray-700'>
                        Tüm ilanları göster
                        <ChevronRight className='ml-1 h-4 w-4' />
                      </span>
                    </div>
                  </Link>
                </div>
                <div className='flex gap-2'>
                  {/* <button className='inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors duration-300'>
                    <Edit2 className='size-3' />
                    Düzenle
                  </button> */}
                  <DeleteOrganization
                    organizationId={chauffeur.chauffeurId}
                    isAdmin={true}
                    orgType='chauffeur'
                  />
                </div>
              </div>
              <div className='flex items-center m-2'>
                <User className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{chauffeur.contactName}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Mail className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{chauffeur.email}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Phone className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{chauffeur.phone}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Map className='w-5 h-5 mr-2 text-muted-foreground' />
                <SkeletonLoader>{chauffeur.location}</SkeletonLoader>
              </div>
              <div className='flex items-center m-2'>
                <Globe className='w-5 h-5 mr-2 text-muted-foreground' />
                {chauffeur.website ? (
                  <a
                    href={chauffeur.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <SkeletonLoader>{chauffeur.website}</SkeletonLoader>
                  </a>
                ) : (
                  'Websitesi Yok'
                )}
              </div>
              <div className='flex items-center m-2'>
                <Facebook className='w-5 h-5 mr-2 text-muted-foreground' />
                {chauffeur.socialFacebook ? (
                  <a
                    href={chauffeur.socialFacebook}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <SkeletonLoader>{chauffeur.socialFacebook}</SkeletonLoader>
                  </a>
                ) : (
                  'Facebook Sayfasi Yok'
                )}
              </div>
              <div className='mt-6'>
                <Link href='/new-chauffeur'>
                  <Button className='w-full bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold'>
                    Sürücü oluşturun
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <Alert>
            <AlertDescription>
              Sürücü oluşturmadınız.
              <Button className='m-1 text-orange-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                <Link href={'new-chauffeur'}>Sürücü Oluşturun</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </ul>
    </div>
  );
}
