import Image from 'next/image';
import Link from 'next/link';
import { User } from '@solar-icons/react';
import LinkerUserButton from './linkerUserButton';

interface LinkerHeaderProps {
  isCompany?: boolean;
}

export default function LinkerHeader({ isCompany = false }: LinkerHeaderProps) {
  return (
    <nav className="border-uaq-default-200 flex items-center justify-between border-b px-20 py-4 drop-shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/UAQBlack.svg" alt="UAQ Logo" width={120} height={120} className="h-7 w-6" />
        </Link>
        <Link href="/">
          <Image
            src="/BTBlack.svg"
            alt="Bolsa de Trabajo Logo"
            width={120}
            height={120}
            className="h-8 w-30"
          />
        </Link>
      </div>

      {isCompany ? (
        <LinkerUserButton imageUrl="/Deloitte.svg" title="Deloitte Qro" />
      ) : (
        <div className="flex items-center justify-center gap-2 pb-1">
          <User weight="Bold" className="h-5 w-5" />
          <span className="text-sm">vinculadorx@gmail.com</span>
        </div>
      )}
    </nav>
  );
}
