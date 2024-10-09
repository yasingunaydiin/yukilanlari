'use client';

import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Define the props type for the DeleteOrganization component
type DeleteOrganizationProps = {
  organizationId: string; // ID of the organization to be deleted
  isAdmin: boolean; // Boolean indicating if the current user is an admin
};

export default function DeleteOrganization({
  organizationId,
  isAdmin,
}: DeleteOrganizationProps) {
  // State to manage the deleting process
  const [isDeleting, setIsDeleting] = useState(false);
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);
  // Hook to programmatically change routes
  const router = useRouter();

  // Function to handle the deletion process
  const handleDelete = async () => {
    // Check if the user is an admin
    if (!isAdmin) {
      setError('You do not have permission to delete this organization');
      return;
    }

    // Confirm deletion with the user
    if (!confirm('Bu şirketi silmek istediğinizden emin misiniz?')) return;

    // Set deleting state to true and clear any previous errors
    setIsDeleting(true);
    setError(null);

    try {
      // Send DELETE request to the API
      const response = await fetch(`/api/organizations/${organizationId}`, {
        method: 'DELETE',
      });

      // If the response is not ok, throw an error
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Şirket silinemedi');
      }

      // Redirect after successful deletion
      router.push('/new-listing');
    } catch (err) {
      // Set error message if deletion fails
      setError(`Şirket silinemedi. ${(err as Error).message}`);
    } finally {
      // Set deleting state back to false regardless of outcome
      setIsDeleting(false);
    }
  };

  // If the user is not an admin, don't render the delete button
  if (!isAdmin) {
    return null;
  }

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
