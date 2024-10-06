'use client';
import TimeAgo from '@/app/components/TimeAgo';
import type { Job } from '@/models/Job';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';

//If something doesnt work with the emojis, put it in teh translportcategories component.

const transportCategoriesArray = [
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

  return (
    <>
      <div className='bg-white p-4 rounded-lg shadow-sm relative'>
        <div className='absolute top-4 cursor-pointer right-4'>
          <FontAwesomeIcon className='size-5 text-gray-400' icon={faHeart} />
        </div>
        <div className='flex grow gap-4'>
          <div className='content-center text-3xl'>{categoryEmoji}</div>
          <div className='grow sm:flex'>
            <div className='grow'>
              <Link
                href={`/jobs/${jobInfo.orgId}`}
                className='text-gray-500 text-sm'
              >
                {jobInfo.orgName}
              </Link>{' '}
              {/*The guy added extra code at 5:09:16, if something with the company name goes wrong or doesnt change check this.*/}
              <div className='font-bold'>{jobInfo.title}</div>
              <div className='text-gray-500 text-sm flex items-center'>
                {jobInfo.category} &middot; {jobInfo.tonaj} &middot;{' '}
                {formatLocation(jobInfo.countryFrom, jobInfo.cityFrom)}
                <FontAwesomeIcon
                  className='size-4 text-gray-800 p-1'
                  icon={faArrowRight}
                />
                {formatLocation(jobInfo.countryTo, jobInfo.cityTo)}
                {jobInfo.isAdmin && (
                  <>
                    &nbsp; &middot; &nbsp;{' '}
                    <Link href={'/jobs/edit/' + jobInfo._id}>Düzenle</Link>
                    &nbsp; &middot; &nbsp;{' '}
                    <a
                      className='cursor-pointer'
                      type='button'
                      onClick={async () => {
                        await axios.delete('/api/jobs?id=' + jobInfo._id);
                        window.location.reload();
                      }}
                    >
                      Sil
                    </a>
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
      </div>
    </>
  );
}
