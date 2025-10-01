"use client";

import ComponentHeader from "@/components/shared/ComponentHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// Animation variants for each accordion item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Faq() {
  return (
    <div className="py-10" id="faq">
      <ComponentHeader
        title="Frequently Asked Questions"
        subTitle="Have questions? I've got answers. Here are some of the things people most often ask me."
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 max-w-3xl mx-auto px-4"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}

// FAQ data - easy to update and manage
const faqData = [
  {
    question: "What technologies are you most passionate about right now?",
    answer:
      "I'm deeply passionate about the entire modern JavaScript ecosystem. I love building scalable backends with Node.js, Express, and PostgreSQL, and creating fluid user interfaces with Next.js and TypeScript. I'm also actively exploring DevOps practices with Docker and CI/CD to streamline the development lifecycle.",
  },
  {
    question: "How do you approach a new project?",
    answer:
      "My approach is collaborative and structured. I start by thoroughly understanding the project's goals and the problems it aims to solve. From there, I plan the architecture, define the data models, and break down the work into manageable tasks. I believe in clean code, frequent communication, and iterative development to ensure the final product is robust and aligns perfectly with the vision.",
  },
  {
    question: "What makes you a strong candidate for a full-stack role?",
    answer:
      "I bridge the gap between frontend and backend development. My experience allows me to build cohesive, end-to-end features and understand the implications of a design choice on the entire system. I'm not just a coder; I'm a problem-solver who is committed to writing efficient, scalable, and maintainable code.",
  },
  {
    question: "Are you available for freelance projects or full-time roles?",
    answer:
      "I am currently open to exploring new full-time opportunities where I can contribute to a challenging and collaborative project. I'm also available for select freelance projects that align with my skill set. Feel free to reach out via the contact form to discuss your project!",
  },
];
