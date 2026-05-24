import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

function Accordion({ className = "", ...props }) {
  return (
    <AccordionPrimitive.Root
      className={`flex w-full flex-col ${className}`}
      {...props}
    />
  );
}

function AccordionItem({ className = "", ...props }) {
  return (
    <AccordionPrimitive.Item
      className={`border-b ${className}`}
      {...props}
    />
  );
}

function AccordionTrigger({
  className = "",
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={`group flex flex-1 items-center justify-between py-3 text-left font-medium ${className}`}
        {...props}
      >
        {children}

        <span>
          <ChevronDown
            className="group-data-[state=open]:hidden"
            size={18}
          />
          <ChevronUp
            className="hidden group-data-[state=open]:block"
            size={18}
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className = "",
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      className={`overflow-hidden ${className}`}
      {...props}
    >
      <div className="py-3">
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};