import Image from "next/image";

interface LinkerUserButtonProps {
  imageUrl: string;
  title: string;
}

export default function LinkerUserButton({
  imageUrl,
  title,
}: LinkerUserButtonProps) {
  return (
    <button className="flex items-center gap-2 p-2 rounded-sm hover:bg-uaq-default-200 transition-colors">
      <div className="w-8 h-8 overflow-hidden">
        <Image
          src={imageUrl}
          alt="User Logo"
          width={32}
          height={32}
          className="w-full h-full object-cover"
        />
      </div>
      
      <span className="text-sm font-medium text-uaq-default-800">{title}</span>
      

    </button>
  );
}