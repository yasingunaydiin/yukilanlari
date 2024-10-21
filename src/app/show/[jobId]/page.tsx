import OrgButton from '@/app/components/OrgButton';
import TimeAgo from '@/app/components/TimeAgo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { JobModel } from '@/models/Job';
import {
  BusFront,
  Flag,
  Mail,
  MapPinHouse,
  Package,
  Phone,
  Ruler,
  User,
  Weight,
} from 'lucide-react';
import mongoose from 'mongoose';

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function SingleJobPage(props: PageProps) {
  const jobId = props.params.jobId;
  mongoose.connect(process.env.MONGO_URI as string);
  const jobInfo = await JobModel.findById(jobId);

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
          <div className='mt-6 text-sm text-muted-foreground'>
            <TimeAgo createdAt={jobInfo.createdAt} /> paylaşıldı
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
