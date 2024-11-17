'use client';
import { Job } from '@/models/Job';
import { useState } from 'react';
import Jobs from './Jobs';

interface ShowMoreJobs {
  initialJobs: Job[];
}

export default function ShowMoreJobs({ initialJobs }: ShowMoreJobs) {
  const [jobs, setJobs] = useState(initialJobs);
  const [loading, setLoading] = useState(false);
  const [ifMoreJobs, setIfMoreJobs] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(5); // Start with 3 items

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/jobs?skip=0&limit=${currentLimit + 5}`
      );
      const newJobs = await response.json();

      if (newJobs.length <= currentLimit) {
        setIfMoreJobs(false);
      }

      setJobs(newJobs);
      setCurrentLimit((prev) => prev + 5);
    } catch (error) {
      console.error('Daha fazla iş yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Jobs jobs={jobs} />
      {ifMoreJobs && (
        <div className='flex justify-center mt-5'>
          <button
            onClick={loadMore}
            disabled={loading}
            className='bg-yellow-400 text-white py-2 px-4 rounded-md'
          >
            {loading ? 'Yükleniyor...' : 'Daha fazla ilan göster'}
          </button>
        </div>
      )}
    </div>
  );
}
