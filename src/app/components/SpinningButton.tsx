'use client';

import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';

export default function SpinningButton({
  isFormValid,
}: {
  isFormValid: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function navigate() {
    if (isFormValid) {
      startTransition(() => {
        // Redirect will be handled in the form submission
      });
    }
  }

  return (
    <div className='flex justify-center'>
      <Button
        className='bg-yellow-400'
        onClick={navigate}
        disabled={!isFormValid}
      >
        Oluştur
        {isPending && <Loader2 className='ml-2 mr-2 h-4 w-4 animate-spin' />}
      </Button>
    </div>
  );
}
