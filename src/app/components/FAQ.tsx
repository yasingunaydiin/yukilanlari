// components/FaqSection.jsx

const faqs = [
  {
    question: 'Yük İlanları.net nedir?',
    answer:
      'Yük İlanları, boş tır ve nakliye araçlarıyla şirketleri bir araya getiren ücretsiz bir platformdur. Nakliye ihtiyacı olan şirketler boş araçları bulabilir, tır şoförleri ise yeni iş imkanlarına kolayca ulaşabilir.',
  },
  {
    question: 'Yük İlanları.net ücretli mi?',
    answer:
      'Yük İlanları tamamen ÜCRETSİZ bir platformdur. Şirketler ve tır şoförleri diledikleri gibi ilan verebilir, iş bağlantıları kurabilir.',
  },
  {
    question: 'Platformu her yaştan kullanıcı için uygun mu?',
    answer:
      'Evet, Yük İlanları.net her yaştan ve her seviyeden kullanıcı için oldukça kolay bir arayüze sahiptir. Kayıt olup ilan vermek için sadece birkaç adımı takip etmek yeterlidir.',
  },
  {
    question: 'Yük İlanları.net`in desteği nasıl?',
    answer:
      'Yük İlanları, kullanıcılarını her zaman desteklemeye hazırdır. Platformda karşılaştığınız herhangi bir sorun veya sorunuz olduğunda, müşteri desteğimizden yardım alabilirsiniz',
  },
  {
    question: 'Yük İlanları’nda nasıl ilan verebilirim?',
    answer:
      'İlan vermek çok kolay! Platforma giriş yapın, “İlan oluşturun" butonuna tıklayın, hesabınızı açın veya giriş yapın, şirket veya sürücü profilinizi açın veya seçin, son olarak "İlan oluştur" butonuna basıp ilanınızı oluşturun.',
  },
];

const FAQ = () => {
  return (
    <div className='max-w-4xl mx-auto px-1 py-20 '>
      <h2 className='text-3xl font-semibold mb-6'>Sıkça sorulan sorular</h2>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='border-t border-gray-300 py-4 sm:flex sm:justify-between'
          >
            <h3 className='text-lg font-medium text-gray-800'>
              {faq.question}
            </h3>
            <p className='text-gray-600 max-w-lg'>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
