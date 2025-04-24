import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface IFAQProps {
  questions: string[];
  answers: string[];
}

export default function FAQ(props: IFAQProps) {
  const { questions, answers } = props;
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {questions.map((question, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx + 1}`}
          className={`border-b! pb-2 mt-4 ${idx === 0 ? "border-t" : ""}`}
        >
          <AccordionTrigger className="flex justify-between items-center py-4 hover:no-underline cursor-pointer">
            <span className="text-lg font-semibold text-gray-900">
              {question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-gray-900 font-normal">
            {answers[idx]}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
