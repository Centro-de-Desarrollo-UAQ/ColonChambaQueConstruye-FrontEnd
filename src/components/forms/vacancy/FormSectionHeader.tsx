type Props = {
  title: string;
  description?: string;
  className?: string;
};

export default function FormSectionHeader({ title, description, className }: Props) {
  return (
    <>
      <h2 className={`text-xl font-bold ${className}`}>{title}</h2>
      <p className="text-sm leading-5">{description}</p>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300" />
    </>
  );
}
