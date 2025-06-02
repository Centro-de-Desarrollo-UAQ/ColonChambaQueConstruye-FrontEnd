import Image from 'next/image';
import Link from 'next/link';
import { User } from '@solar-icons/react';
import CompanyProfileButton from '../employer/CompanyProfileButton';

interface HeaderProps {
  isCompany?: boolean;
  userIcon?: React.ReactNode;
  userEmail?: string;
  companyImageUrl?: string;
  companyTitle?: string;
}

export default function LinkerHeader({
  isCompany = false,
  userIcon = <User weight="Bold" className="h-5 w-5" />,
  userEmail = "vinculadorx@gmail.com",
  companyImageUrl = "/Deloitte.svg",
  companyTitle = "Deloitte Qro"
}: HeaderProps) {
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
        <CompanyProfileButton imageUrl={companyImageUrl} title={companyTitle} />
      ) : (
        <div className="flex items-center justify-center gap-2 pb-1">
          {userIcon}
          <span className="text-sm">{userEmail}</span>
        </div>
      )}
    </nav>
  );
}