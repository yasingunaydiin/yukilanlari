'use client';

import { Button } from '@/app/components/ui/button';
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
    if (
      !confirm(
        'Are you sure you want to delete this organization? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    console.log('Attempting to delete organization with ID:', organizationId);

    try {
      const response = await fetch(`/api/organizations/${organizationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete organization');
      }

      console.log('Organization deleted successfully');
      router.push('/'); // Adjust this to your desired redirect path
    } catch (err) {
      console.error('Error deleting organization:', err);
      setError(
        `Failed to delete organization. ${
          err instanceof Error ? err.message : 'Unknown error'
        }`
      );
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
