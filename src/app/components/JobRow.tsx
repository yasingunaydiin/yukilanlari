'use client';
import TimeAgo from '@/app/components/TimeAgo';
import type { Job } from '@/models/Job';
import axios from 'axios';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

//If something doesnt work with the emojis, put it in teh translportcategories component.

const transportCategoriesArray = [
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
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' },
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
    if (confirm('Bu işi silmek istediğinizden emin misiniz??')) {
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
    <div className='relative bg-white p-4 rounded-lg shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white duration-300 cursor-pointer'>
      <Link href={`/show/${jobInfo._id}`}>
        <div className='absolute top-4 right-4 z-10'>
          <Heart className='size-5 text-gray-400' />
        </div>

        <div className='flex grow gap-4'>
          <div className='content-center text-3xl'>{categoryEmoji}</div>
          <div className='grow sm:flex'>
            <div className='grow'>
              <button
                onClick={handleOrgClick}
                className='text-gray-500 text-sm hover:underline'
              >
                {jobInfo.orgName}
              </button>
              <div className='font-bold'>{jobInfo.title}</div>
              <div className='text-gray-500 text-sm flex items-center capitalize gap-2'>
                {jobInfo.category} &middot; {jobInfo.tonaj} &middot;{' '}
                {formatLocation(jobInfo.countryFrom, jobInfo.cityFrom)}
                <ArrowRight className='text-gray-800 p-1' />
                {formatLocation(jobInfo.countryTo, jobInfo.cityTo)}
                {jobInfo.isAdmin && (
                  <>
                    <button
                      onClick={handleEditClick}
                      className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 z-10'
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className='cursor-pointer inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 z-10'
                    >
                      Sil
                    </button>
                  </>
                )}
              </div>
            </div>
            {jobInfo.createdAt && (
              <div className='content-end text-gray-500 text-sm'>
                <TimeAgo createdAt={jobInfo.createdAt} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
