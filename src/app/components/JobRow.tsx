'use client';
import TimeAgo from '@/app/components/TimeAgo';
import type { Job } from '@/models/Job';
import axios from 'axios';
import {
  Edit2,
  Flag,
  Heart,
  MapPinHouse,
  Package,
  Trash2,
  Weight,
} from 'lucide-react';
import Link from 'next/link';

//If something doesnt work with the emojis, put it in teh translportcategories component.

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

const getEmojiForCategory = (category: string): string => {
  const categoryObj = transportCategoriesArray.find(
    (cat) => cat.value === category
  );
  return categoryObj ? categoryObj.emoji : '🏷️';
};

export default function JobRow({ jobInfo }: { jobInfo: Job }) {
  const categoryEmoji = getEmojiForCategory(jobInfo.category);
  const formatLocation = (
    country: string | undefined,
    city: string
  ): string => {
    if (!country) return ''; // Return an empty string or handle the undefined case
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
    if (confirm('Bu işi silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete('/api/jobs?id=' + jobInfo._id);
        window.location.reload();
      } catch (error) {
        console.error('İş silme hatası:', error);
        alert('İş silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
      <Link href={`/show/${jobInfo._id}`} className='block p-4'>
        <div className='flex gap-4'>
          <div className='content-center text-4xl'>{categoryEmoji}</div>
          <div className='grow'>
            <div className='flex justify-between items-start mb-2'>
              <button
                onClick={handleOrgClick}
                className='text-primary text-sm font-medium hover:underline'
              >
                {jobInfo.orgName}
              </button>
              <Heart className='size-5 text-gray-400 hover:text-red-500 transition-colors duration-300' />
            </div>
            <h2 className='text-lg font-bold mb-2'>{jobInfo.title}</h2>
            <div className='flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 text-sm text-gray-600'>
              <div className='flex items-center gap-1'>
                <Package className='size-4' />
                <span className='capitalize'>Kategori:</span> {jobInfo.category}
              </div>
              <div className='flex items-center gap-1'>
                <Weight className='size-4' />
                <span className='font-medium'>Tonaj:</span> {jobInfo.tonaj}
              </div>
              <div className='flex items-center gap-1'>
                <MapPinHouse className='size-4' />
                <span>
                  {formatLocation(jobInfo.countryFrom, jobInfo.cityFrom)}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Flag className='size-4' />
                <span>{formatLocation(jobInfo.countryTo, jobInfo.cityTo)}</span>
              </div>
            </div>
            <div className='mt-4 flex items-center justify-between'>
              {jobInfo.createdAt && (
                <div className='text-gray-500 text-sm'>
                  <TimeAgo createdAt={jobInfo.createdAt} />
                </div>
              )}
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
          </div>
        </div>
      </Link>
    </div>
  );
}
