type Props = {
  title: string;
  description: string;
};

export default function FormSectionHeader({ title, description }: Props) {
  return (
    <>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm leading-5 mb-6">{description}</p>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300" />
    </>
  );
}
