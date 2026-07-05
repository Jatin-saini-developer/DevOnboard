import { Link } from "react-router-dom";

/* ── SVG icon paths (inline, no dependencies) ── */
const icons = {
  shield: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  ),
  lock: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  ),
  key: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  ),
  fingerprint: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
  ),
  globe: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  ),
  server: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
  ),
  document: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  ),
  users: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  ),
  eye: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  ),
  eyeCircle: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  clock: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  cog: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
  ),
  noSymbol: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  ),
  sparkles: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  ),
};

/* ── Section data ── */
const infrastructureSecurity = [
  {
    icon: "shield",
    title: "SOC 2 Type II",
    desc: "DevOnboard undergoes regular Service Organization Controls audits to validate our security, availability, and confidentiality practices.",
  },
  {
    icon: "globe",
    title: "GDPR Compliant",
    desc: "We are committed to compliance with Europe's General Data Protection Regulation, ensuring your data rights are respected.",
  },
  {
    icon: "document",
    title: "Data Processing Agreement",
    desc: "We provide a comprehensive DPA to all customers, covering data processing obligations and sub-processor disclosures.",
  },
  {
    icon: "server",
    title: "Encrypted at Rest & in Transit",
    desc: "All data is encrypted in transit with TLS 1.3 and at rest using AES-256 encryption across all storage systems.",
  },
  {
    icon: "clock",
    title: "Audit Logs",
    desc: "Comprehensive audit logs automatically track important workspace events, providing full visibility into account activity.",
  },
  {
    icon: "cog",
    title: "Admin Controls",
    desc: "Granular administrative controls let you manage team permissions, restrict access, and enforce security policies workspace-wide.",
  },
];

const identityAccess = [
  {
    icon: "key",
    title: "Single Sign-On (SSO)",
    desc: "Authenticate into DevOnboard using Google SSO, GitHub, or log in via email with secure magic link codes.",
  },
  {
    icon: "fingerprint",
    title: "Two-Factor Authentication",
    desc: "Add an extra layer of protection with TOTP-based two-factor authentication for all user accounts.",
  },
  {
    icon: "users",
    title: "Role-Based Access Control",
    desc: "Assign granular roles and permissions to team members, ensuring users only access what they need.",
  },
  {
    icon: "noSymbol",
    title: "IP Restrictions",
    desc: "Restrict workspace access to specific IP addresses or ranges, ensuring only authorized networks can connect.",
  },
];

const dataPrivacy = [
  {
    icon: "eyeCircle",
    title: "Private Workflows",
    desc: "Create private workflows visible only to authorized team members, keeping sensitive automations confidential.",
  },
  {
    icon: "lock",
    title: "Credential Vault",
    desc: "All API keys, tokens, and credentials are stored in an isolated, encrypted vault — never exposed in workflow logs or exports.",
  },
  {
    icon: "sparkles",
    title: "Data Minimization",
    desc: "We only collect data necessary to provide the Service and do not sell, rent, or trade your personal information to third parties.",
  },
  {
    icon: "check",
    title: "Data Retention Controls",
    desc: "You control how long your data is stored. Export or delete your data at any time from your account settings.",
  },
];

export default function Security() {
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
      <div className="relative text-center pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,125,255,0.06),transparent_70%)] pointer-events-none" />
        <p className="relative text-sm font-medium text-[#8b7dff] mb-4">Security</p>
        <h1 className="relative text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-tighter leading-[1.08] text-white max-w-3xl mx-auto">
          Safe, secure,{" "}
          <br className="hidden sm:block" />
          and private.
        </h1>
        <p className="relative mt-6 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
          Everything in DevOnboard is designed to keep your workflows safe and your data secure. Because your business is nobody else's business.
        </p>
      </div>

      {/* ── Section 1: Infrastructure & Compliance ── */}
      <SecuritySection
        badge="Infrastructure & Compliance"
        badgeIcon={icons.shield}
        title="Enterprise-grade security."
        titleHighlight="Peace of mind-as-a-service."
        description="DevOnboard is built with best-in-class security practices to keep your workflows safe at every layer. This includes state-of-the-art encryption, reliable infrastructure, and independently verified security controls."
        features={infrastructureSecurity}
      />

      {/* ── Section 2: Identity & Access ── */}
      <SecuritySection
        badge="Identity & Access"
        badgeIcon={icons.key}
        title="Keep an eye on your work."
        titleHighlight="And keep other eyes out."
        description="DevOnboard offers multiple authentication methods and access controls, giving you full authority over who can enter your workspace and what they can do."
        features={identityAccess}
      />

      {/* ── Section 3: Data & Privacy ── */}
      <SecuritySection
        badge="Data & Privacy"
        badgeIcon={icons.eyeCircle}
        title="Privacy first, second, and third."
        titleHighlight="Choose what to share and with whom."
        description="Your workflows and data belong to you. We provide complete transparency and control over your information, with privacy built into every layer of the platform."
        features={dataPrivacy}
        last
      />

      {/* ── CTA Section ── */}
      <div className="relative py-28 sm:py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,125,255,0.04),transparent_70%)] pointer-events-none" />
        <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-8 leading-tight">
          Build with confidence.
        </h2>
        <p className="relative text-white/40 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Start automating your workflows with enterprise-grade security from day one.
        </p>
        <div className="relative flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-all duration-200 no-underline"
          >
            Get started
          </Link>
          <a
            href="mailto:security@devonboard.com"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white/70 border border-white/[0.1] rounded-lg hover:bg-white/[0.04] hover:text-white transition-all duration-200 no-underline"
          >
            Contact security
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/25">© {new Date().getFullYear()} DevOnboard. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/landingpage" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Home</Link>
            <Link to="/terms" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Terms</Link>
            <Link to="/privacy" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Privacy</Link>
            <Link to="/security" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


/* ── Sub-components ── */

function SecuritySection({ badge, badgeIcon, title, titleHighlight, description, features, last }) {
  return (
    <section className={`max-w-[1200px] mx-auto px-6 ${last ? "pb-10" : "pb-24"}`}>
      <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
        {/* Section intro — full-width top area */}
        <div className="px-8 sm:px-12 pt-12 pb-10 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-[#8b7dff]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{badgeIcon}</svg>
            </span>
            <span className="text-sm font-medium text-[#8b7dff]">{badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight leading-[1.2] text-white/50 max-w-2xl">
            <span className="text-white">{titleHighlight}</span>{" "}
            {title}
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-white/40 max-w-2xl">{description}</p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={icons[f.icon]}
              title={f.title}
              desc={f.desc}
              isOdd={features.length % 2 !== 0 && i === features.length - 1}
              borderRight={i % 2 === 0}
              borderBottom={i < features.length - (features.length % 2 === 0 ? 2 : 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, isOdd, borderRight, borderBottom }) {
  return (
    <div
      className={`
        group px-8 sm:px-10 py-8 transition-colors duration-300 hover:bg-white/[0.02]
        ${isOdd ? "sm:col-span-2" : ""}
        ${borderRight && !isOdd ? "sm:border-r border-white/[0.06]" : ""}
        ${borderBottom ? "border-b border-white/[0.06]" : ""}
      `}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{icon}</svg>
        </span>
        <h4 className="text-[15px] font-semibold text-white">{title}</h4>
      </div>
      <p className="text-[14px] leading-relaxed text-white/40 group-hover:text-white/50 transition-colors duration-300">{desc}</p>
    </div>
  );
}
