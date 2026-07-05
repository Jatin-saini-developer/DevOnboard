const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
    title: "Visual Drag & Drop Builder",
    description:
      "Build onboarding flows visually with our canvas editor. Connect nodes, define conditions, and design complex workflows without writing a single line of code.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l4.5 4.5a4.5 4.5 0 010 6.364l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757" />
      </svg>
    ),
    title: "Deep Integrations",
    description:
      "Native connections to GitHub, Slack, Jira, Notion, and more. Grant repo access, invite to channels, assign to boards — all automatically.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Provisioning",
    description:
      "Trigger a workflow and watch access get provisioned across all tools in seconds. No more waiting hours for IT tickets to get resolved.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Role-Based Access",
    description:
      "Create different workflows for frontend devs, backend engineers, DevOps, and more. Each role gets exactly the access and resources they need.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
    title: "Reusable Templates",
    description:
      "Save workflows as templates and reuse them across teams. Clone, customize, and scale your onboarding process effortlessly.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Audit & Analytics",
    description:
      "Track every onboarding. See which workflows ran, how long provisioning took, and identify bottlenecks in your process.",
  },
];

export default function Features() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-5">
            Features
          </p>
          <h2 className="text-4xl sm:text-[44px] font-bold tracking-[-0.02em] text-white">
            Everything you need to
            <br />
            automate onboarding
          </h2>
          <p className="text-neutral-500 mt-4 text-[16px] max-w-lg mx-auto leading-relaxed">
            Purpose-built for engineering teams who want to eliminate manual
            setup and give every new developer a world-class first day.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-xl border border-white/[0.04] overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-black hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-neutral-400 flex items-center justify-center mb-5 group-hover:text-white group-hover:border-white/[0.1] transition-all duration-300">
                {feature.icon}
              </div>

              <h3 className="text-[15px] font-semibold text-neutral-200 mb-2.5 group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-[13px] text-neutral-600 leading-relaxed group-hover:text-neutral-500 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
