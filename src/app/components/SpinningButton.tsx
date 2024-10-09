'use client';

import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function SpinningButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function navigate() {
    startTransition(() => {
      router.push('/new-listing');
    });
  }

  return (
    <div className='flex justify-center'>
      <Button className='bg-yellow-400'>
        <button type='button' onClick={navigate}>
          Oluştur
        </button>
        {isPending && <Loader2 className='ml-2 mr-2 h-4 w-4 animate-spin' />}
      </Button>
    </div>
  );
}
