interface QuestionItemProps {
    question: string;
    description: string;
  }
  
  export default function QuestionItem({ question, description }: QuestionItemProps) {
    return (
      <div className="flex w-[800px] border border-uaq-default-200 rounded-lg p-4">
        <div className="w-1/3 pr-4 border-r border-uaq-default-100">
          <h3 className="font-[800]">{question}</h3>
        </div>
        <div className="w-2/3 pl-4">
          <p className="text-uaq-default-700 opacity-75">• {description}</p>
        </div>
      </div>
    )
  }