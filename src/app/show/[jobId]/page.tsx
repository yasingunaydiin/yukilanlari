import TimeAgo from '@/app/components/TimeAgo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { JobModel } from '@/models/Job';
import {
  ArrowRight,
  Mail,
  MapPin,
  MapPinHouse,
  Package,
  Phone,
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
          <CardTitle className='text-3xl font-bold'>{jobInfo.title}</CardTitle>
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
                <div className='flex items-start gap-2 flex-col'>
                  <div className='flex items-center'>
                    <Package className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span className='capitalize'>{jobInfo.category}</span>
                  </div>
                  <div className='flex items-center'>
                    <Weight className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span className='capitalize'>{jobInfo.tonaj}</span>
                  </div>
                </div>
                <div className='flex items-center'>
                  <MapPinHouse className='w-5 h-5 mr-2 text-muted-foreground' />
                  <span>
                    {jobInfo.countryFrom}, {jobInfo.cityFrom}
                  </span>
                  <span className='p-1'>
                    <ArrowRight />
                  </span>
                  <MapPin className='w-5 h-5 mr-2 text-muted-foreground' />
                  <span>
                    {jobInfo.countryTo}, {jobInfo.cityTo}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-2'>İletişim Bilgileri</h2>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <User className='w-5 h-5 mr-2 text-muted-foreground' />
                  <span className='capitalize'>{jobInfo.contactName}</span>
                </div>
                <div className='flex items-center'>
                  <Mail className='w-5 h-5 mr-2 text-muted-foreground' />
                  <span>{jobInfo.contactEmail}</span>
                </div>
                <div className='flex items-center'>
                  <Phone className='w-5 h-5 mr-2 text-muted-foreground' />
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
