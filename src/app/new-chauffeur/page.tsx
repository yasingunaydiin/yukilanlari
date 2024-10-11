import { createChauffeur } from '@/app/actions/workosActions';
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

export default async function NewChauffeurPage() {
  const { user } = await withAuth();

  if (!user) {
    redirect('/login');
  }

  // Type assertion to assure TypeScript that user exists
  const authenticatedUser = user as User;

  async function handleNewChauffeurFormSubmit(formData: FormData) {
    'use server';
    const newChauffeurName = formData.get('newChauffeurName') as string;
    const newChauffeurContactName = formData.get(
      'newChauffeurContactName'
    ) as string;
    const newChauffeurPhone = formData.get('newChauffeurPhone') as string;
    const newChauffeurEmail = formData.get('newChauffeurEmail') as string;
    const newChauffeurLocation = formData.get('newChauffeurLocation') as string;
    const newChauffeurWebsite = formData.get('newChauffeurWebsite') as string;
    const newChauffeurSocialFacebook = formData.get(
      'newChauffeurSocialFacebook'
    ) as string;

    if (
      newChauffeurName &&
      newChauffeurContactName &&
      newChauffeurPhone &&
      newChauffeurEmail &&
      newChauffeurLocation
    ) {
      await createChauffeur(
        newChauffeurName,
        newChauffeurContactName,
        newChauffeurPhone,
        newChauffeurEmail,
        newChauffeurLocation,
        newChauffeurWebsite || '',
        newChauffeurSocialFacebook || '',
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
          <form action={handleNewChauffeurFormSubmit} className='space-y-4'>
            <Input
              name='newChauffeurName'
              type='text'
              placeholder='Sürücü ismi gir'
              required
            />
            <Input
              name='newChauffeurContactName'
              type='text'
              placeholder='İsim gir'
              required
            />
            <Input
              name='newChauffeurPhone'
              type='text'
              placeholder='Telefon numarası gir'
              required
            />
            <Input
              name='newChauffeurEmail'
              type='email'
              placeholder='E-posta adresi gir'
              required
            />
            <Input
              name='newChauffeurLocation'
              type='text'
              placeholder='Konum gir'
              required
            />
            <Input
              name='newChauffeurWebsite'
              type='text'
              placeholder='Website adresini gir'
            />
            <Input
              name='newChauffeurSocialFacebook'
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
