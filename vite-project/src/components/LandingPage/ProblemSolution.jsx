const metrics = [
  {
    before: "2-3 Weeks",
    after: "< 5 Minutes",
    label: "Time to Full Access",
    description: "From new hire start to fully provisioned across all tools",
  },
  {
    before: "12+ Steps",
    after: "1 Click",
    label: "Manual Setup Steps",
    description: "Replace manual IT checklists with a single workflow trigger",
  },
  {
    before: "5-8 Hours",
    after: "0 Hours",
    label: "Engineering Manager Time",
    description: "Per new hire spent coordinating access across teams and tools",
  },
];

const painPoints = [
  {
    icon: "😤",
    title: "Day 1: No Access",
    description:
      "New devs spend their first day waiting for GitHub invites, Slack channels, and Jira boards. Momentum killed before it starts.",
  },
  {
    icon: "📝",
    title: "Manual Checklists",
    description:
      "Engineering managers juggle spreadsheets and ticketing systems to provision access. Steps get missed. Every. Single. Time.",
  },
  {
    icon: "🔄",
    title: "Repeated Work",
    description:
      "The same onboarding steps are repeated manually for every hire. It doesn't scale, and the process is different every time.",
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Problem section */}
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-5">
            The Problem
          </p>
          <h2 className="text-4xl sm:text-[44px] font-bold tracking-[-0.02em] text-white">
            Developer onboarding
            <br />
            is broken
          </h2>
          <p className="text-neutral-500 mt-4 text-[16px] max-w-lg mx-auto leading-relaxed">
            Most engineering teams still onboard developers the same way they
            did 10 years ago — manually, inconsistently, and painfully slow.
          </p>
        </div>

        {/* Pain points */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-xl border border-white/[0.04] overflow-hidden mb-28">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="p-8 bg-black"
            >
              <span className="text-2xl">{point.icon}</span>
              <h3 className="text-[15px] font-semibold text-neutral-200 mt-5 mb-2.5">
                {point.title}
              </h3>
              <p className="text-[13px] text-neutral-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution / Metrics */}
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-5">
            The DevOnboard Difference
          </p>
          <h2 className="text-4xl sm:text-[44px] font-bold tracking-[-0.02em] text-white">
            See the impact
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative p-8 rounded-xl border border-white/[0.06] bg-white/[0.01] text-center group hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Before */}
              <div className="text-[11px] font-medium text-neutral-700 uppercase tracking-wider mb-1.5">
                Before
              </div>
              <div className="text-xl font-bold text-neutral-600 line-through decoration-neutral-800 mb-5">
                {metric.before}
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-white/[0.06] mx-auto mb-5" />

              {/* After */}
              <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                With DevOnboard
              </div>
              <div className="text-2xl font-bold text-white mb-5">
                {metric.after}
              </div>

              {/* Label */}
              <div className="text-[13px] font-medium text-neutral-300 mb-1">
                {metric.label}
              </div>
              <div className="text-[12px] text-neutral-700">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
