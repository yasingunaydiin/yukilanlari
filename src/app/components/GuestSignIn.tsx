import Link from 'next/link';
import { Button } from './ui/button';

interface ButtonLinkProps {
  signInUrl: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ signInUrl }) => (
  <Link href={signInUrl}>
    <Button variant='ghost'>
      İletişim için
      <span className='m-1 text-yellow-400 inline-flex items-center gap-1 rounded-md bg-orange-50 px-4 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
        Giriş yapın
      </span>
    </Button>
  </Link>
);

export default ButtonLink;
