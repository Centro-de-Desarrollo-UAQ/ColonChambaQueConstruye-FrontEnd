import Image from 'next/image';

interface CompanyProfileButtonProps {
  imageUrl: string;
  title: string;
}

export default function CompanyProfileButton({ imageUrl, title }: CompanyProfileButtonProps) {
  return (
    <button className="flex items-center gap-2 rounded-sm p-2 transition-colors hover:bg-zinc-200">
      <div className="h-8 w-8 overflow-hidden">
        <Image
          src={imageUrl}
          alt="User Logo"
          width={32}
          height={32}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="text-sm font-medium text-zinc-800">{title}</span>
    </button>
  );
}
