import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import './Accordian.css'
import SectionDivAccordian from './SectionDivAccordian'


const AccordionFilledDemo = ({items}) => {
  return (
    <Accordion
      type='single'
      className='w-full space-y-2 overflow-visible border-0 [&>*>[data-slot="accordion-content"]]:px-0 cursort:pointer'
      defaultValue='item-1'
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className='w-full overflow-hidden rounded-lg border! bg-transparent'
        >
          <AccordionTrigger className='w-full bg-accent px-5 data-open:rounded-b-none'>{item.title}</AccordionTrigger>
          <AccordionContent className='w-full text-muted-foreground h-auto px-5 pt-4'>
            <div className='accordian-content-div'>
              {/* Hr ek section k liye map kro is data ko */}
              <SectionDivAccordian/>
              <SectionDivAccordian/>
              <SectionDivAccordian/>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionFilledDemo
