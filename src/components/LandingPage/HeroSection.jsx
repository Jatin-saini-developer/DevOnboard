import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const workflowNodes = [
  { id: 1, icon: "⚡", label: "New Hire Trigger", delay: 0 },
  { id: 2, icon: "🐙", label: "GitHub Access", delay: 200 },
  { id: 3, icon: "💬", label: "Slack Channels", delay: 400 },
  { id: 4, icon: "📋", label: "Jira Project", delay: 600 },
  { id: 5, icon: "📝", label: "Notion Docs", delay: 800 },
];

export default function HeroSection() {
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [activeConnection, setActiveConnection] = useState(-1);

  useEffect(() => {
    workflowNodes.forEach((node) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 600 + node.delay);
    });

    const connectionTimer = setInterval(() => {
      setActiveConnection((prev) => {
        if (prev >= workflowNodes.length - 2) return 0;
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(connectionTimer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Subtle top glow — Linear-style blue edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] text-[13px] text-neutral-500 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Built for Engineering Teams
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-[64px] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              Stop losing weeks
              <br />
              to developer
              <br />
              onboarding
            </h1>

            {/* Subheadline */}
            <p className="text-neutral-500 mt-6 text-[17px] leading-relaxed max-w-md">
              Visually build onboarding workflows that automatically provision
              GitHub, Slack, Jira, and Notion access. Every new engineer is
              productive from day one.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                to="/signup"
                className="group bg-white hover:bg-neutral-200 px-6 py-3 rounded-lg font-semibold text-black text-[14px] transition-all duration-200"
              >
                Start Building Free
                <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>

              <a
                href="#how-it-works"
                className="border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] px-6 py-3 rounded-lg font-medium text-neutral-400 hover:text-white text-[14px] transition-all duration-200"
              >
                See How It Works
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-6 text-[13px] text-neutral-600">
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No code required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>5-min setup</span>
              </div>
            </div>
          </div>

          {/* Right: Animated Workflow Visual */}
          <div className="relative">
            <div className="relative bg-neutral-950 border border-white/[0.06] rounded-xl p-5">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-5 pb-3.5 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <span className="ml-3 text-[11px] text-neutral-600 font-mono">
                  developer-onboarding.workflow
                </span>
              </div>

              {/* Workflow nodes */}
              <div className="flex flex-col gap-2">
                {workflowNodes.map((node, index) => (
                  <div key={node.id}>
                    {/* Node */}
                    <div
                      className={`flex items-center gap-3.5 p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02] transition-all duration-700 ${
                        visibleNodes.includes(node.id)
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-6"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg shrink-0">
                        {node.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-neutral-200">
                          {node.label}
                        </div>
                        <div className="text-[11px] text-neutral-600">
                          {index === 0
                            ? "When new hire is added"
                            : `Auto-provision ${node.label.toLowerCase()}`}
                        </div>
                      </div>
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          activeConnection >= index - 1 && index > 0
                            ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                            : index === 0
                              ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                              : "bg-neutral-800"
                        }`}
                      />
                    </div>

                    {/* Connection line */}
                    {index < workflowNodes.length - 1 && (
                      <div className="flex justify-center">
                        <div
                          className={`w-px h-2 transition-all duration-500 ${
                            activeConnection >= index
                              ? "bg-white/[0.15]"
                              : "bg-white/[0.04]"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom status bar */}
              <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-emerald-500/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Workflow Active
                </div>
                <span className="text-[11px] text-neutral-700">
                  5 nodes · Auto-run
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}