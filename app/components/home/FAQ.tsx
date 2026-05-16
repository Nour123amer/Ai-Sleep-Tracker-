import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HelpCircle } from "lucide-react";

export default function FAQ() {
  return (
    <section className="relative px-6 py-20 md:px-16 w-full">

      {/* background glow */}
      <div className="absolute top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-200/30 blur-3xl"></div>

      <h2 className="mb-10 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="mx-auto w-full lg:w-1/2 rounded-2xl border bg-white p-6 shadow-lg">
        <Accordion type="single" collapsible defaultValue="item-1">

          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" />
                Is it accessible?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes. It adheres to modern accessibility standards (ARIA support).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" />
                Does it track sleep accurately?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, it uses smart algorithms to analyze sleep patterns.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
}