'use client';

import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteOrganizationProps = {
  organizationId: string;
};

export default function DeleteOrganization({
  organizationId,
}: DeleteOrganizationProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Bu şirketi silmek istediğinizden emin misiniz?')) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/organizations/${organizationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Şirket silinemedi');
      }

      router.push('/new-listing'); // Redirect after successful deletion
    } catch (err) {
      setError(`Şirket silinemedi. ${(err as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        variant='destructive'
      >
        Şirketi Sil
        {isDeleting && <Loader2 className='ml-2 mr-2 h-4 w-4 animate-spin' />}
      </Button>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
