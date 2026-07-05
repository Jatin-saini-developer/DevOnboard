import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Build Your Workflow",
    description:
      "Drag and drop integration nodes onto the visual canvas. Connect GitHub, Slack, Jira, Notion and more — no code required.",
    visual: {
      type: "builder",
      nodes: [
        { icon: "⚡", label: "Trigger", subtitle: "New hire event" },
        { icon: "🐙", label: "GitHub", subtitle: "Add to org & repos" },
        { icon: "💬", label: "Slack", subtitle: "Join #engineering" },
      ],
    },
  },
  {
    number: "02",
    title: "Configure Each Step",
    description:
      "Set up exactly what happens at each stage — which repos to grant access, which channels to invite to, which Jira project boards to add them to.",
    visual: {
      type: "config",
      fields: [
        { label: "Repository", value: "frontend-app, api-service" },
        { label: "Permission", value: "Write access" },
        { label: "Team", value: "Engineering" },
      ],
    },
  },
  {
    number: "03",
    title: "Trigger & Forget",
    description:
      "When a new developer joins, trigger the workflow. Everything provisions automatically in seconds. Zero manual setup, zero missed steps.",
    visual: {
      type: "status",
      items: [
        { icon: "🐙", label: "GitHub Access", status: "done" },
        { icon: "💬", label: "Slack Channels", status: "done" },
        { icon: "📋", label: "Jira Board", status: "done" },
        { icon: "📝", label: "Notion Docs", status: "active" },
      ],
    },
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const renderVisual = (visual) => {
    if (visual.type === "builder") {
      return (
        <div className="space-y-2">
          {visual.nodes.map((node, i) => (
            <div key={i}>
              <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg">
                  {node.icon}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-neutral-200">
                    {node.label}
                  </div>
                  <div className="text-[11px] text-neutral-600">{node.subtitle}</div>
                </div>
              </div>
              {i < visual.nodes.length - 1 && (
                <div className="flex justify-center">
                  <div className="w-px h-2 bg-white/[0.08]" />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (visual.type === "config") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg">
              🐙
            </div>
            <span className="text-[13px] font-medium text-neutral-200">
              GitHub Configuration
            </span>
          </div>
          {visual.fields.map((field, i) => (
            <div key={i}>
              <label className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider">
                {field.label}
              </label>
              <div className="mt-1.5 bg-white/[0.02] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-neutral-400">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (visual.type === "status") {
      return (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 mb-4 text-[11px] text-neutral-600 font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Provisioning in progress…
          </div>
          {visual.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-[13px] text-neutral-400">
                {item.label}
              </span>
              {item.status === "done" ? (
                <span className="text-[11px] font-medium text-neutral-400 bg-white/[0.04] px-2.5 py-1 rounded-md">
                  ✓ Done
                </span>
              ) : (
                <span className="text-[11px] font-medium text-neutral-500 bg-white/[0.04] px-2.5 py-1 rounded-md animate-pulse">
                  Running…
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section id="how-it-works" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-5">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-[44px] font-bold tracking-[-0.02em] text-white">
            Three steps to
            <br />
            zero-friction onboarding
          </h2>
          <p className="text-neutral-500 mt-4 text-[16px] max-w-lg mx-auto leading-relaxed">
            Build a workflow once, and every new hire gets perfectly provisioned
            access across all your tools automatically.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Step selector */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white/[0.02] border-white/[0.08]"
                    : "bg-transparent border-transparent hover:border-white/[0.04]"
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`text-[13px] font-bold font-mono transition-colors duration-300 mt-0.5 ${
                      activeStep === index
                        ? "text-white"
                        : "text-neutral-800"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3
                      className={`text-[15px] font-semibold transition-colors duration-300 ${
                        activeStep === index ? "text-white" : "text-neutral-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-[13px] mt-2 leading-relaxed transition-all duration-500 ${
                        activeStep === index
                          ? "text-neutral-500 opacity-100 max-h-24"
                          : "text-neutral-700 opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Visual */}
          <div className="sticky top-32">
            <div className="bg-neutral-950 border border-white/[0.06] rounded-xl p-5">
              {/* Window bar */}
              <div className="flex items-center gap-2 mb-5 pb-3.5 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <span className="ml-3 text-[11px] text-neutral-700 font-mono">
                  {activeStep === 0
                    ? "workflow-builder"
                    : activeStep === 1
                      ? "node-config"
                      : "execution-log"}
                </span>
              </div>

              <div className="min-h-[280px]">
                {renderVisual(steps[activeStep].visual)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
