'use client';
import type { Job } from '@/models/Job';
import axios from 'axios';
import { format } from 'date-fns';
import {
  BusFront,
  CalendarDays,
  Edit2,
  Flag,
  MapPinHouse,
  Package,
  Trash2,
  Weight,
} from 'lucide-react';
import Link from 'next/link';
import SkeletonLoader from './SkeletonLoader';
import TimeAgo from './TimeAgo';

const transportCategoriesArray = [
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' },
  { value: 'Araç Kurtarma', label: 'Araç Kurtarma', emoji: '🚗' },
  { value: 'Gıda', label: 'Gıda', emoji: '🍽️' },
  { value: 'Giysi', label: 'Giysi', emoji: '👗' },
  { value: 'Mobilya', label: 'Mobilya', emoji: '🛋️' },
  { value: 'Elektronik', label: 'Elektronik', emoji: '💻' },
  { value: 'İnşaat Malzemeleri', label: 'İnşaat Malzemeleri', emoji: '🏗️' },
  { value: 'Kimyasallar', label: 'Kimyasallar', emoji: '⚗️' },
  { value: 'Otomotiv', label: 'Otomotiv', emoji: '🚗' },
  { value: 'Makine', label: 'Makine', emoji: '🛠️' },
  { value: 'Kitap', label: 'Kitap', emoji: '📚' },
  { value: 'Spor Eşyaları', label: 'Spor Eşyaları', emoji: '⚽' },
  { value: 'İnşaat Ekipmanları', label: 'İnşaat Ekipmanları', emoji: '🧰' },
  { value: 'Bitki', label: 'Bitki', emoji: '🌱' },
  { value: 'Çiçek', label: 'Çiçek', emoji: '🌸' },
];

const UrgencyArray = [
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' },
  { value: 'Acil', label: 'Acil', emoji: '🚨' },
  { value: 'Bu Hafta', label: 'Bu Hafta', emoji: '📅' },
  { value: 'Bu Ay', label: 'Bu Ay', emoji: '📆' },
  { value: 'Bugün', label: 'Bugün', emoji: '☀️' },
];

const getEmojiForCategory = (category: string): string => {
  const categoryObj = transportCategoriesArray.find(
    (cat) => cat.value === category
  );
  return categoryObj ? categoryObj.emoji : '🏷️';
};

const getUrgencyBadge = (urgency: string): string => {
  const urgencyObj = UrgencyArray.find((urg) => urg.value === urgency);
  return urgencyObj ? urgencyObj.emoji : '🏷️';
};

const getUrgencyTitle = (urgency: string): string => {
  const urgencyObj = UrgencyArray.find((urg) => urg.value === urgency);
  return urgencyObj ? urgencyObj.label : 'Diğer';
};

export default function JobRow({ jobInfo }: { jobInfo: Job }) {
  const categoryEmoji = getEmojiForCategory(jobInfo.category);
  const urgencyBadge = getUrgencyBadge(jobInfo.urgency);
  const urgencyTitle = getUrgencyTitle(jobInfo.urgency);
  const formattedJobDate = jobInfo.jobDate
    ? format(new Date(jobInfo.jobDate), 'dd/MM/yyyy')
    : 'Bunu görmemelisin';

  const formatLocation = (
    country: string | undefined,
    city: string
  ): string => {
    if (!country) return '';
    return country.toLowerCase() === 'türkiye' ? city : country;
  };

  const handleOrgClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/jobs/${jobInfo.orgId}`;
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/jobs/edit/${jobInfo._id}`;
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete('/api/jobs?id=' + jobInfo._id);
        window.location.reload();
      } catch (error) {
        console.error('İlan silme hatası:', error);
        alert('İlan silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
      <Link href={`/show/${jobInfo._id}`} className='block p-4'>
        <div className='flex gap-4'>
          <div className='content-center text-4xl'>{categoryEmoji}</div>
          <div className='grow'>
            <div className='flex justify-between gap-5 items-center'>
              <div className='flex gap-2'>
                <button
                  onClick={handleOrgClick}
                  className='text-primary text-sm font-medium hover:underline'
                >
                  {jobInfo.orgName}
                </button>
                <div className='gap-1 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors duration-300'>
                  <div>{urgencyBadge}</div>
                  <div>{urgencyTitle}</div>
                </div>
              </div>

              <div className='hidden sm:block'>
                {jobInfo.createdAt && (
                  <div className='text-gray-500 text-sm'>
                    <TimeAgo createdAt={jobInfo.createdAt} />
                  </div>
                )}
              </div>
            </div>

            <h2 className='text-lg font-bold mb-2'>{jobInfo.title}</h2>
            <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 text-sm text-gray-600'>
              <div className='flex items-center gap-1'>
                <Package className='size-4' />
                <span className='capitalize'>Kategori:</span>
                <SkeletonLoader>{jobInfo.category}</SkeletonLoader>
              </div>
              <div className='flex items-center gap-1'>
                <Weight className='size-4' />
                <span className='capitalize'>Tonaj:</span>{' '}
                <SkeletonLoader>{jobInfo.weight}</SkeletonLoader>
              </div>
              <div className='flex items-center gap-1'>
                <BusFront className='size-4' />
                <span className='capitalize'>Araç Tipi:</span>{' '}
                <SkeletonLoader>{jobInfo.vehicleType}</SkeletonLoader>
              </div>
              <div className='flex items-center gap-1'>
                <MapPinHouse className='size-4' />
                <SkeletonLoader>
                  <span>
                    {formatLocation(jobInfo.countryFrom, jobInfo.cityFrom)}
                  </span>
                </SkeletonLoader>
              </div>
              <div className='flex items-center gap-1'>
                <Flag className='size-4' />
                <SkeletonLoader>
                  <span>
                    {formatLocation(jobInfo.countryTo, jobInfo.cityTo)}
                  </span>
                </SkeletonLoader>
              </div>
            </div>
            <div className='mt-2 sm:gap-x-4 text-sm text-gray-600'>
              <span className='flex items-center gap-1'>
                <CalendarDays className='size-4' /> Tarih:{' '}
                <SkeletonLoader>{formattedJobDate}</SkeletonLoader>
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className='mb-4 mr-4 flex items-center justify-end gap-2'>
        {jobInfo.isAdmin && (
          <div className='flex gap-2'>
            <button
              onClick={handleEditClick}
              className='inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors duration-300'
            >
              <Edit2 className='size-3' />
              Düzenle
            </button>
            <button
              onClick={handleDeleteClick}
              className='inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors duration-300'
            >
              <Trash2 className='size-3' />
              Sil
            </button>
          </div>
        )}
      </div>
      <div className='md:hidden -mt-5 p-3'>
        {jobInfo.createdAt && (
          <div className='text-gray-500 text-sm'>
            <TimeAgo createdAt={jobInfo.createdAt} />
          </div>
        )}
      </div>
    </div>
  );
}
