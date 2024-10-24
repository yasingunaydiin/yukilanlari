import CallButton from '@/app/components/CallButton';
import MailButton from '@/app/components/EmailButton';
import GuestSignIn from '@/app/components/GuestSignIn';
import OrgButton from '@/app/components/OrgButton';
import TimeAgo from '@/app/components/TimeAgo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import WhatsAppButton from '@/app/components/WhatsappButton';
import { JobModel } from '@/models/Job';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import {
  BusFront,
  Flag,
  Mail,
  MapPinHouse,
  MessageCircle,
  Package,
  Phone,
  Ruler,
  User,
  Weight,
} from 'lucide-react';
import mongoose from 'mongoose';
import Link from 'next/link';

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function SingleJobPage(props: PageProps) {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  const jobId = props.params.jobId;
  mongoose.connect(process.env.MONGO_URI as string);
  const jobInfo = await JobModel.findById(jobId);

  if (!user) {
    return (
      <div className='container my-6 max-w-3xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>
              <OrgButton orgId={jobInfo.orgId} title={jobInfo.title} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold mb-2'>Açıklama</h2>
                <p className='text-muted-foreground'>{jobInfo.description}</p>
              </div>
              <div>
                <h2 className='text-xl font-semibold mb-2'>İş Detayları</h2>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-start gap-2 flex-col text-muted-foreground'>
                    <div className='flex items-center'>
                      <Package className='w-5 h-5 mr-2' />
                      <span className='capitalize'>{jobInfo.category}</span>
                    </div>
                    <div className='flex items-center'>
                      <Weight className='w-5 h-5 mr-2' />
                      <span className='capitalize'>{jobInfo.weight}</span>
                    </div>
                    <div className='flex items-center'>
                      <BusFront className='w-5 h-5 mr-2' />
                      <span className='capitalize'>{jobInfo.vehicleType}</span>
                    </div>
                    <div className='flex items-center'>
                      <Ruler className='w-5 h-5 mr-2' />
                      <span className='capitalize'>{jobInfo.vehicleSize}</span>
                    </div>
                    <div className='flex items-center'>
                      <MapPinHouse className='w-5 h-5 mr-2' />
                      <span>
                        {jobInfo.countryFrom}, {jobInfo.cityFrom}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Flag className='w-5 h-5 mr-2' />
                      <span>
                        {jobInfo.countryTo}, {jobInfo.cityTo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className='text-xl font-semibold mb-2'>
                  İletişim Bilgileri
                </h2>
                <div className='space-y-2 text-muted-foreground'>
                  <div className='flex items-center'>
                    <User className='w-5 h-5 mr-2' />
                    <GuestSignIn signInUrl={signInUrl} />
                  </div>
                  <div className='flex items-center'>
                    <Mail className='w-5 h-5 mr-2' />
                    <GuestSignIn signInUrl={signInUrl} />
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 mr-2' />
                    <GuestSignIn signInUrl={signInUrl} />
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-green-600 mt-5 p-5 rounded-lg text-white sm:w-[400px] mx-auto w-[250px] '>
              <div className='flex gap-2 items-center'>
                <MessageCircle className='sm:size-6 size-10' />
                <h3 className='text-xl font-semibold'>
                  WhatsApp mesajı göndermek için
                </h3>
              </div>
              <button className='mt-2 w-full bg-green-500 hover:bg-green-700 py-2 rounded-md'>
                <Link
                  href={signInUrl}
                  className='flex gap-2 items-center justify-center'
                >
                  Giriş yapın
                </Link>
              </button>
            </div>
            <div className='bg-indigo-600 mt-5 p-5 rounded-lg text-white sm:w-[400px] mx-auto w-[250px]'>
              <div className='flex gap-2 items-center'>
                <Phone className='sm:size-6 size-7' />
                <h3 className='text-xl font-semibold'>
                  İlan sahibini aramak için
                </h3>
              </div>
              <button className='mt-2 w-full bg-indigo-500 hover:bg-indigo-700 py-2 rounded-md'>
                <Link
                  href={signInUrl}
                  className='flex gap-2 items-center justify-center'
                >
                  Giriş yapın
                </Link>
              </button>
            </div>
            <div className='bg-gray-100 mt-5 p-5 rounded-lg sm:w-[400px] mx-auto w-[250px]'>
              <div className='flex gap-2 items-center'>
                <Mail className='sm:size-6 size-6' />
                <h3 className='text-xl font-semibold'>
                  Email ile ulaşmak için
                </h3>
              </div>
              <button className='mt-2 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-md'>
                <Link
                  href={signInUrl}
                  className='flex gap-2 items-center justify-center'
                >
                  Giriş yapın
                </Link>
              </button>
            </div>

            <div className='mt-6 text-sm text-muted-foreground'>
              <TimeAgo createdAt={jobInfo.createdAt} /> paylaşıldı
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>
            <OrgButton orgId={jobInfo.orgId} title={jobInfo.title} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-semibold mb-2'>Açıklama</h2>
              <p className='text-muted-foreground'>{jobInfo.description}</p>
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-2'>İş Detayları</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-start gap-2 flex-col text-muted-foreground'>
                  <div className='flex items-center'>
                    <Package className='w-5 h-5 mr-2' />
                    <span className='capitalize'>{jobInfo.category}</span>
                  </div>
                  <div className='flex items-center'>
                    <Weight className='w-5 h-5 mr-2' />
                    <span className='capitalize'>{jobInfo.weight}</span>
                  </div>
                  <div className='flex items-center'>
                    <BusFront className='w-5 h-5 mr-2' />
                    <span className='capitalize'>{jobInfo.vehicleType}</span>
                  </div>
                  <div className='flex items-center'>
                    <Ruler className='w-5 h-5 mr-2' />
                    <span className='capitalize'>{jobInfo.vehicleSize}</span>
                  </div>
                  <div className='flex items-center'>
                    <MapPinHouse className='w-5 h-5 mr-2' />
                    <span>
                      {jobInfo.countryFrom}, {jobInfo.cityFrom}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Flag className='w-5 h-5 mr-2' />
                    <span>
                      {jobInfo.countryTo}, {jobInfo.cityTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-2'>İletişim Bilgileri</h2>
              <div className='space-y-2 text-muted-foreground'>
                <div className='flex items-center'>
                  <User className='w-5 h-5 mr-2' />
                  <span className='capitalize'>{jobInfo.contactName}</span>
                </div>
                <div className='flex items-center'>
                  <Mail className='w-5 h-5 mr-2' />
                  <span>{jobInfo.contactEmail}</span>
                </div>
                <div className='flex items-center'>
                  <Phone className='w-5 h-5 mr-2' />
                  <span>{jobInfo.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>

          <WhatsAppButton phoneNumber={jobInfo.contactPhone} />
          <CallButton phoneNumber={jobInfo.contactPhone} />
          <MailButton contactEmail={jobInfo.contactEmail} />

          <div className='mt-6 text-sm text-muted-foreground'>
            <TimeAgo createdAt={jobInfo.createdAt} /> paylaşıldı
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
