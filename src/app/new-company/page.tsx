import { createCompany } from '@/app/actions/companyActions';
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

export default async function NewCompanyPage() {
  const { user } = await withAuth();

  if (!user) {
    redirect('/login');
  }

  const authenticatedUser = user as User;

  async function handleNewCompanyFormSubmit(formData: FormData) {
    'use server';
    const newCompanyName = formData.get('newCompanyName') as string;
    const newCompanyContactName = formData.get(
      'newCompanyContactName'
    ) as string;
    const newCompanyPhone = formData.get('newCompanyPhone') as string;
    const newCompanyEmail = formData.get('newCompanyEmail') as string;
    const newCompanyLocation = formData.get('newCompanyLocation') as string;
    const newCompanyWebsite = formData.get('newCompanyWebsite') as string;
    const newCompanySocialFacebook = formData.get(
      'newCompanySocialFacebook'
    ) as string;

    if (
      newCompanyName &&
      newCompanyContactName &&
      newCompanyPhone &&
      newCompanyEmail &&
      newCompanyLocation
    ) {
      await createCompany(
        newCompanyName,
        newCompanyContactName,
        newCompanyPhone,
        newCompanyEmail,
        newCompanyLocation,
        newCompanyWebsite || '',
        newCompanySocialFacebook || '',
        authenticatedUser.id
      );
      redirect('/new-listing');
    }
  }

  return (
    <div className='container max-w-md mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Yeni bir şirket oluşturun</CardTitle>
          <CardDescription>
            Bir ilan oluşturmak için şirketinizi oluşturun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleNewCompanyFormSubmit} className='space-y-4'>
            <Input
              name='newCompanyName'
              type='text'
              placeholder='Şirket ismi gir'
              required
            />
            <Input
              name='newCompanyContactName'
              type='text'
              placeholder='İsim gir'
              required
            />
            <Input
              name='newCompanyPhone'
              type='text'
              placeholder='Telefon numarası gir (Örnek: 0541 123 45 67)'
              required
            />
            <Input
              name='newCompanyEmail'
              type='email'
              placeholder='E-posta adresi gir (Örnek: mehmet@gmail.com)'
              required
            />
            <Input
              name='newCompanyLocation'
              type='text'
              placeholder='Konum gir (Örnek: İstanbul)'
              required
            />
            <Input
              name='newCompanyWebsite'
              type='text'
              placeholder='Website adresini gir (Opsiyonel)'
            />
            <Input
              name='newCompanySocialFacebook'
              type='text'
              placeholder='Facebook adresini gir (Opsiyonel)'
            />
            <SpinningButton isFormValid={true} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
