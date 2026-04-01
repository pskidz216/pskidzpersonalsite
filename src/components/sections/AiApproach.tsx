"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

const approaches = [
  {
    title: "Prospecting & Research",
    description:
      "AI pipelines that monitor CRM deals, scrape prospect websites, discover key executives, and deliver fully-briefed intelligence reports — automatically, around the clock.",
  },
  {
    title: "Outreach & Personalization",
    description:
      "LLM-powered systems that generate hyper-personalized messaging across email and LinkedIn. Every touchpoint is tailored to the prospect — at scale, not one by one.",
  },
  {
    title: "Sales Intelligence",
    description:
      "Automated competitive analysis, buy-signal scoring, and AI-generated pitch decks. By the time I pick up the phone, I already know what matters to them.",
  },
  {
    title: "Internal Tools & Apps",
    description:
      "Custom AI-powered dashboards, employee handbooks with built-in chatbots, and SDR platforms that replace entire workflow stacks. Built fast, shipped faster.",
  },
];

export function AiApproach() {
  return (
    <section
      id="ai"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading>How I Use AI</SectionHeading>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          AI isn&apos;t a buzzword in my workflow — it&apos;s the engine. I build custom
          systems that let small teams operate like they&apos;re ten times their size.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
        >
          {approaches.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-accent-coral mt-2.5 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-lg md:text-xl">
                    {item.title}
                  </h3>
                  <p className="font-body text-text-secondary text-[15px] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
