import { Card, CardContent } from '@/app/components/ui/card';
import { getCounts } from '@/lib/actions';
import { CheckCircle, Eye, Target, User, Users } from 'lucide-react';

export const revalidate = 10; // Revalidate every hour

export default async function About() {
  const { companyCount, chauffeurCount, jobCount } = await getCounts();
  const stats = [
    {
      number: companyCount.toString(),
      label: 'Aktif Şirket Hesabı',
      icon: <User className='w-6 h-6 text-indigo-600' />,
    },
    {
      number: chauffeurCount.toString(),
      label: 'Aktif Sürücü Hesabı',
      icon: <Users className='w-6 h-6 text-emerald-600' />,
    },
    {
      number: jobCount.toString(),
      label: 'İlan Paylaşımı',
      icon: <CheckCircle className='w-6 h-6 text-orange-600' />,
    },
  ];

  return (
    <div className='container mx-auto px-4 py-16 max-w-7xl'>
      <div className='space-y-4 mb-12'>
        <h1 className='text-indigo-600 font-medium'>Biz Kimiz?</h1>
        <h1 className='text-4xl font-bold'>Geliştirme ve Çözümler</h1>
        <p className='text-gray-600 max-w-3xl'>
          Lojistik sektöründe yenilikçi bir yaklaşım benimseyen ekibimiz, boş
          tır sahipleri ile nakliye ihtiyacı olan şirketleri bir araya getirerek
          verimliliği artırmayı hedefliyoruz. Teknoloji odaklı platformumuz,
          kullanıcı dostu arayüzü ile tır sahiplerine ve şirketlere hızlı ve
          etkili çözümler sunuyor.
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <Card className='p-6'>
          <CardContent className='space-y-4 pt-6'>
            <div className='bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center'>
              <Target className='text-white h-6 w-6' />
            </div>
            <h3 className='text-xl font-bold'>Misyonumuz</h3>
            <p className='text-gray-600'>
              Misyonumuz, boş tır sahipleri ve nakliye ihtiyacı olan şirketleri
              bir araya getirerek lojistik süreçlerini hızlandırmak, maliyeti
              azaltmak ve verimliliği artırmaktır.
            </p>
          </CardContent>
        </Card>

        <Card className='p-6'>
          <CardContent className='space-y-4 pt-6'>
            <div className='bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center'>
              <Eye className='text-white h-6 w-6' />
            </div>
            <h3 className='text-xl font-bold'>Vizyonumuz</h3>
            <p className='text-gray-600'>
              Vizyonumuz, nakliye ve lojistik alanında dijitalleşmeyi en üst
              düzeye çıkararak, tır şoförleri ve şirketler için vazgeçilmez bir
              platform haline gelmektir. Hedefimiz, sektördeki tüm paydaşlar
              için hızlı ve yenilikçi çözümler sunarak lojistiğin geleceğini
              şekillendirmektir.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid md:grid-cols-3 gap-6 mt-12 '>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='bg-slate-50 rounded-lg p-6 flex flex-col items-center text-center'
          >
            <div className='mb-4'>{stat.icon}</div>
            <h3 className='text-4xl font-bold mb-2'>{stat.number}</h3>
            <p className='text-gray-600'>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
