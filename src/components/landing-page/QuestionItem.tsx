interface QuestionItemProps {
  question: string;
  description: string;
}

export default function QuestionItem({ question, description }: QuestionItemProps) {
  return (
    <div className="border-zinc-200 flex w-[800px] rounded-lg border p-4">
      <div className="border-zinc-100 w-1/3 border-r pr-4">
        <h3 className="font-[800]">{question}</h3>
      </div>
      <div className="w-2/3 pl-4">
        <p className="text-zinc-700 opacity-75">• {description}</p>
      </div>
    </div>
  );
}
