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

  function handleClick() {
    if (isFormValid) {
      startTransition(() => {
        // Perform form submission or other logic here
        console.log('Form is valid, proceeding...');
        // If necessary, you can add a redirect or any async logic here
      });
    }
  }

  return (
    <div className='flex justify-center'>
      <Button
        className='bg-yellow-400'
        onClick={handleClick}
        disabled={!isFormValid || isPending} // Disable if form is invalid or pending
      >
        Oluştur
        {isPending && <Loader2 className='ml-2 mr-2 h-4 w-4 animate-spin' />}
      </Button>
    </div>
  );
}
