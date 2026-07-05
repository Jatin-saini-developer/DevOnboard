import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to set up DevOnboard?",
    answer:
      "Most teams have their first workflow live within 15 minutes. Simply connect your integrations (GitHub, Slack, etc.), drag and drop nodes onto the canvas, configure each step, and you're done.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We currently support GitHub, Slack, Jira, and Notion — the core tools most engineering teams rely on. We're actively building integrations for GitLab, Linear, Confluence, Google Workspace, and more. Custom webhooks are also available.",
  },
  {
    question: "Do I need to write any code?",
    answer:
      "Absolutely not. DevOnboard is a fully visual, no-code platform. You build workflows by dragging nodes onto a canvas and configuring them through simple forms. If you can fill out a form, you can automate your onboarding.",
  },
  {
    question: "Can I create different workflows for different roles?",
    answer:
      "Yes! You can create separate workflows for frontend engineers, backend engineers, DevOps, QA, or any other role. Each workflow can grant different repository access, join different Slack channels, and share role-specific documentation.",
  },
  {
    question: "Is my team's data secure?",
    answer:
      "Security is our top priority. All data is encrypted at rest and in transit. We use OAuth2 for all integrations, and we never store your team's passwords. We also support SSO and audit logging for enterprise teams.",
  },
  {
    question: "How does pricing work?",
    answer:
      "DevOnboard is free for small teams with up to 3 workflows. Our Pro plan includes unlimited workflows, custom templates, and priority support. Enterprise plans include SSO, audit logs, and dedicated onboarding.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-28">
      <div className="max-w-2xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-5">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-[44px] font-bold tracking-[-0.02em] text-white">
            Frequently asked
            <br />
            questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-px">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-white/[0.04]"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  className={`text-[14px] font-medium transition-colors duration-200 ${
                    openIndex === index ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-700 transition-transform duration-300 shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === index ? "max-h-48 opacity-100 pb-5" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
