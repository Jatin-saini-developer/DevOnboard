import { useState } from "react";

const testimonials = [
  {
    quote:
      "We used to lose the first week of every new hire to access requests and Slack invites. DevOnboard cut that to literally zero. Our last three engineers pushed code on day one.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Helios Labs",
    avatar: "SC",
  },
  {
    quote:
      "The visual workflow builder is genius. I built our onboarding flow in 20 minutes and it replaced a 47-item checklist we'd been using for years. No more missed steps.",
    name: "Marcus Rivera",
    role: "Engineering Manager",
    company: "Stackline",
    avatar: "MR",
  },
  {
    quote:
      "As a startup scaling from 10 to 50 engineers, onboarding was becoming a full-time job. DevOnboard made it a non-issue. It just works, every time, for every role.",
    name: "Priya Patel",
    role: "CTO",
    company: "Nexus AI",
    avatar: "PP",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-5">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-[44px] font-bold tracking-[-0.02em] text-white">
            Loved by engineering teams
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-xl border border-white/[0.04] overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              className={`p-8 bg-black transition-colors duration-300 cursor-default ${
                active === index ? "bg-white/[0.02]" : ""
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-neutral-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[14px] text-neutral-400 leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-neutral-500 text-[11px] font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-neutral-300">
                    {testimonial.name}
                  </div>
                  <div className="text-[11px] text-neutral-700">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
