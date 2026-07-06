import { Link } from "react-router-dom";

/* ── Team members ── */
const team = [
  {
    name: "Jatin Saini",
    role: "Solo Developer & Founder",
    initials: "JS",
    color: "from-[#8b7dff] to-[#6c5ce7]",
  },
];

/* ── Values ── */
const values = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    ),
    title: "Speed matters",
    desc: "We build tools that are fast because your time is valuable. Every millisecond counts when you're shipping at scale.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    ),
    title: "Craft quality",
    desc: "We obsess over details. From pixel-perfect interfaces to robust backend architecture, quality is non-negotiable.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    ),
    title: "Developer first",
    desc: "We're developers building for developers. We understand the pain points because we've lived them ourselves.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    ),
    title: "Think global",
    desc: "We build for teams everywhere. Our platform is designed to work seamlessly across time zones, languages, and cultures.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    ),
    title: "Iterate openly",
    desc: "We ship fast, gather feedback, and improve relentlessly. Transparency with our users drives everything we build.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
    title: "Trust by default",
    desc: "Security and privacy are foundational, not afterthoughts. We earn trust through transparency and rigorous practices.",
  },
];

/* ── Stats ── */
const stats = [
  { value: "10K+", label: "Workflows created" },
  { value: "500+", label: "Teams onboarded" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50+", label: "Integrations" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#08090a] text-gray-100 antialiased font-['Inter',sans-serif]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] border border-white/[0.06]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-[17px] font-semibold tracking-tight">DevOnboard</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/landingpage" className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-200 hidden sm:block">Home</Link>
            <Link to="/login" className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-200 hidden sm:block">Log in</Link>
            <Link to="/signup" className="text-sm font-semibold text-black bg-white px-4 py-2 rounded-lg hover:bg-neutral-200 transition-all duration-200">Sign up</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative text-center pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 overflow-hidden">
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,125,255,0.06),transparent_70%)] pointer-events-none" />
        <p className="relative text-sm font-medium text-[#8b7dff] mb-4">About DevOnboard</p>
        <h1 className="relative text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-tighter leading-[1.08] text-white max-w-3xl mx-auto">
          Automation for{" "}
          <br className="hidden sm:block" />
          developer teams.
        </h1>
        <p className="relative mt-6 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
          We're building the tools that make developer onboarding seamless, so engineering teams can focus on what matters — shipping great software.
        </p>
      </section>

      {/* ── Mission ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — story */}
            <div className="px-8 sm:px-12 py-12 lg:border-r border-white/[0.06]">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="text-[#8b7dff]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#8b7dff]">Our story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.2] text-white mb-6">
                Built from frustration.{" "}
                <span className="text-white/40">Designed with purpose.</span>
              </h2>
              <div className="text-[15px] leading-7 text-white/50 space-y-4">
                <p>
                  DevOnboard started with a simple observation: every engineering team we'd ever joined had a broken onboarding process. Scattered docs, manual setup scripts, tribal knowledge locked in Slack threads — it was always the same story.
                </p>
                <p>
                  We set out to build a visual workflow platform that lets teams design, automate, and scale their developer onboarding process. One where a new hire can go from zero to productive in hours, not weeks.
                </p>
                <p>
                  Today, DevOnboard powers onboarding workflows for teams of every size — from lean startups to large enterprises — helping them reduce time-to-productivity and build better engineering cultures.
                </p>
              </div>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-2">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`
                    flex flex-col items-center justify-center px-6 py-10 text-center
                    ${i < 2 ? "border-b border-white/[0.06]" : ""}
                    ${i % 2 === 0 ? "border-r border-white/[0.06]" : ""}
                  `}
                >
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  <span className="mt-2 text-[13px] text-white/40 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#8b7dff] mb-4">What drives us</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white">Our values</h2>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto leading-relaxed">
            The principles that shape how we build, how we work, and how we treat our users.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(139,125,255,0.1)] flex items-center justify-center mb-5 text-[#8b7dff] group-hover:bg-[rgba(139,125,255,0.15)] transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{v.icon}</svg>
              </div>
              <h3 className="text-[16px] font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-[14px] leading-relaxed text-white/40 group-hover:text-white/50 transition-colors duration-300">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#8b7dff] mb-4">The person</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white">Meet the developer</h2>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto leading-relaxed">
            A solo developer who cares deeply about developer experience — designing, building, and shipping every part of DevOnboard.
          </p>
        </div>
        <div className="flex justify-center gap-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 text-white text-lg font-semibold shadow-lg`}>
                {member.initials}
              </div>
              <h4 className="text-[14px] font-semibold text-white leading-tight">{member.name}</h4>
              <p className="mt-1 text-[12px] text-white/35">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#8b7dff] mb-4">Our journey</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white">How we got here</h2>
        </div>
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.06]" />

          {[
            { year: "Mar 2026", title: "The idea", desc: "Frustrated by broken onboarding, I started prototyping a visual workflow builder for developer teams." },
            { year: "Apr 2026", title: "First prototype", desc: "Built the core workflow engine and canvas editor. Started testing with early-adopter teams to shape the product." },
            { year: "Jun 2026", title: "Building out", desc: "Added integrations, refined the UI, and iterated on feedback. DevOnboard began taking real shape." },
            { year: "Jul 2026", title: "And growing", desc: "Continuing to ship features, onboard users, and improve the platform every day. The journey is just beginning." },
          ].map((milestone, i) => (
            <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
              {/* Dot */}
              <div className="relative z-10 mt-1.5 flex-shrink-0">
                <div className="w-[10px] h-[10px] rounded-full bg-[#8b7dff] ring-4 ring-[#08090a]" />
              </div>
              {/* Content */}
              <div className="pb-1">
                <span className="text-[12px] font-mono text-white/25 uppercase tracking-wider">{milestone.year}</span>
                <h4 className="text-[16px] font-semibold text-white mt-1 mb-2">{milestone.title}</h4>
                <p className="text-[14px] leading-relaxed text-white/40">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 sm:py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,125,255,0.04),transparent_70%)] pointer-events-none" />
        <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-8 leading-tight">
          Ready to streamline onboarding?
        </h2>
        <p className="relative text-white/40 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Join hundreds of engineering teams who have transformed their developer onboarding.
        </p>
        <div className="relative flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-all duration-200 no-underline"
          >
            Get started for free
          </Link>
          <Link
            to="/landingpage"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white/70 border border-white/[0.1] rounded-lg hover:bg-white/[0.04] hover:text-white transition-all duration-200 no-underline"
          >
            Learn more
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/25">© {new Date().getFullYear()} DevOnboard. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/landingpage" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Home</Link>
            <Link to="/about" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">About</Link>
            <Link to="/terms" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Terms</Link>
            <Link to="/privacy" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Privacy</Link>
            <Link to="/security" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
