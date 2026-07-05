export default function LogoCloud() {
  const integrations = [
    { name: "GitHub", icon: "🐙" },
    { name: "Slack", icon: "💬" },
    { name: "Jira", icon: "📋" },
    { name: "Notion", icon: "📝" },
    { name: "GitLab", icon: "🦊" },
    { name: "Linear", icon: "📐" },
    { name: "Confluence", icon: "📖" },
    { name: "Google Workspace", icon: "📧" },
  ];

  return (
    <section className="border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-[12px] font-medium text-neutral-600 uppercase tracking-[0.15em] mb-10">
          Integrates with the tools your team already uses
        </p>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-300 transition-colors duration-300 group"
            >
              <span className="text-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                {item.icon}
              </span>
              <span className="text-[13px] font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
