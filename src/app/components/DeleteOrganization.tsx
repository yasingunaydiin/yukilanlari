'use client';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

type DeleteOrganizationProps = {
  organizationId: string;
  isAdmin: boolean;
  orgType: 'company' | 'chauffeur';
};

export default function DeleteOrganization({
  organizationId,
  isAdmin,
  orgType,
}: DeleteOrganizationProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const handleDelete = async () => {
    if (!isAdmin) {
      setError('Bu organizasyonu silme izniniz yok');
      return;
    }

    const confirmMessage =
      'Şirket veya sürücünüzü silmek istediğinizden emin misiniz? Bu şirket veya sürücünün tüm ilanları silinecektir.';

    if (!confirm(confirmMessage)) return;

    setIsDeleting(true);
    setError(undefined);

    try {
      const response = await fetch(`/api/organizations/${organizationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orgType }),
      });

      if (!response.ok) {
        const errorMsg = response.headers
          .get('content-type')
          ?.includes('application/json')
          ? (await response.json()).error
          : 'Organizasyon silinemedi';
        throw new Error(errorMsg);
      }

      router.refresh();
    } catch (err) {
      setError(`Organizasyon silinemedi. ${(err as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        variant='destructive'
        className='h-6 inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors duration-300'
      >
        {isDeleting ? (
          <Loader2 className='ml-2 mr-2 h-4 w-4 animate-spin' />
        ) : (
          <>
            <Trash2 className='size-3' />
            Sil
          </>
        )}
      </Button>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
