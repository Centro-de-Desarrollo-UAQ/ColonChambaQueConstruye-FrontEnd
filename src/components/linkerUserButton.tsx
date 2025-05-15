import Image from 'next/image';

interface LinkerUserButtonProps {
  imageUrl: string;
  title: string;
}

export default function LinkerUserButton({ imageUrl, title }: LinkerUserButtonProps) {
  return (
    <button className="hover:bg-uaq-default-200 flex items-center gap-2 rounded-sm p-2 transition-colors">
      <div className="h-8 w-8 overflow-hidden">
        <Image
          src={imageUrl}
          alt="User Logo"
          width={32}
          height={32}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="text-uaq-default-800 text-sm font-medium">{title}</span>
    </button>
  );
}
