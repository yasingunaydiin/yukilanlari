import { createTrucker } from '@/app/actions/workosActions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { User } from '@workos-inc/node';
import { redirect } from 'next/navigation';
import SpinningButton from '../components/SpinningButton';

export default async function NewTruckerPage() {
  const { user } = await withAuth();

  if (!user) {
    redirect('/login');
  }

  // Type assertion to assure TypeScript that user exists
  const authenticatedUser = user as User;

  async function handleNewTruckerFormSubmit(formData: FormData) {
    'use server';
    const newTruckerName = formData.get('newTruckerName') as string;
    const newTruckerContactName = formData.get(
      'newTruckerContactName'
    ) as string;
    const newTruckerPhone = formData.get('newTruckerPhone') as string;
    const newTruckerEmail = formData.get('newTruckerEmail') as string;
    const newTruckerLocation = formData.get('newTruckerLocation') as string;
    const newTruckerWebsite = formData.get('newTruckerWebsite') as string;
    const newTruckerSocialFacebook = formData.get(
      'newTruckerSocialFacebook'
    ) as string;

    if (
      newTruckerName &&
      newTruckerContactName &&
      newTruckerPhone &&
      newTruckerEmail &&
      newTruckerLocation
    ) {
      await createTrucker(
        newTruckerName,
        newTruckerContactName,
        newTruckerPhone,
        newTruckerEmail,
        newTruckerLocation,
        newTruckerWebsite || '',
        newTruckerSocialFacebook || '',
        authenticatedUser.id
      );
      redirect('/new-listing');
    }
  }

  return (
    <div className='container max-w-md mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Yeni bir sürücü oluştur</CardTitle>
          <CardDescription>
            Bir ilan oluşturmak için sürücünüzü oluşturun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleNewTruckerFormSubmit} className='space-y-4'>
            <Input
              name='newTruckerName'
              type='text'
              placeholder='Sürücü ismi gir'
              required
            />
            <Input
              name='newTruckerContactName'
              type='text'
              placeholder='İsim gir'
              required
            />
            <Input
              name='newTruckerPhone'
              type='text'
              placeholder='Telefon numarası gir'
              required
            />
            <Input
              name='newTruckerEmail'
              type='email'
              placeholder='E-posta adresi gir'
              required
            />
            <Input
              name='newTruckerLocation'
              type='text'
              placeholder='Konum gir'
              required
            />
            <Input
              name='newTruckerWebsite'
              type='text'
              placeholder='Website adresini gir'
            />
            <Input
              name='newTruckerSocialFacebook'
              type='text'
              placeholder='Facebook adresini gir'
            />
            <SpinningButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
