'use client';

import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteOrganizationProps = {
  orgId: string;
};

export default function DeleteOrganization({ orgId }: DeleteOrganizationProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this organization? This action cannot be undone.'
      )
    )
      return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/organizations/${orgId}`, {
        //Changed organizationId to orgId
        method: 'DELETE',
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to delete organization');
      }

      router.push('/new-listing');
    } catch (err) {
      setError(`Failed to delete organization. ${(err as Error).message}`);
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
        {isDeleting ? 'Deleting...' : 'Delete Organization'}
      </Button>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
