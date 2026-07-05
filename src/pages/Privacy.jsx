import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const sections = [
  { id: "what-we-cover", title: "What this Privacy Policy Covers" },
  { id: "personal-data", title: "Personal Data" },
  { id: "how-we-use", title: "How We Use Your Personal Data" },
  { id: "how-we-share", title: "How We Share Your Personal Data" },
  { id: "tracking-tools", title: "Tracking Tools and Opt-Out" },
  { id: "data-security", title: "Data Security and Retention" },
  { id: "children", title: "Personal Data of Children" },
  { id: "your-rights", title: "Your Rights" },
  { id: "changes", title: "Changes to this Privacy Policy" },
  { id: "contact", title: "Contact Information" },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <div className="relative text-center pt-36 pb-16 px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,125,255,0.08),transparent_70%)] pointer-events-none" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.12em] text-[#8b7dff] mb-4">Legal</p>
        <h1 className="relative text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tighter leading-[1.1] text-white">Privacy Policy</h1>
        <p className="relative mt-5 text-[13px] font-mono text-white/40 uppercase tracking-wider">Effective date: June 28, 2025</p>
      </div>

      {/* ── Intro ── */}
      <div className="max-w-[720px] mx-auto px-6 pb-16 text-center">
        <p className="text-base leading-7 text-white/70 mb-4">
          At DevOnboard, we take your privacy seriously. Please read this Privacy Policy to learn how we treat your personal data.{" "}
          <strong className="text-white/90">
            By using or accessing our Services in any manner, you acknowledge that you accept the practices and policies outlined below, and you hereby consent that we will collect, use and share your information as described in this Privacy Policy.
          </strong>
        </p>
        <p className="text-base leading-7 text-white/70">
          Remember that your use of DevOnboard's Services is at all times subject to our{" "}
          <Link to="/terms" className="text-[#8b7dff] hover:underline">Terms of Service</Link>.
          Any terms we use in this Policy without defining them have the definitions given to them in the Terms of Service.
        </p>
      </div>

      {/* ── Layout: Sidebar + Content ── */}
      <div className="max-w-[1200px] mx-auto flex gap-16 px-6 pb-20">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block sticky top-[88px] self-start w-[260px] shrink-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-4">On this page</p>
          <ol className="list-none p-0 m-0 flex flex-col gap-0.5">
            {sections.map(({ id, title }, i) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`
                    relative flex items-center gap-2.5 w-full px-3 py-2 border-none rounded-md
                    text-left text-[13px] cursor-pointer transition-all duration-200
                    ${activeSection === id
                      ? "bg-white/[0.025] text-white"
                      : "bg-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.025]"
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-[#8b7dff] transition-all duration-300 ${
                      activeSection === id ? "h-4" : "h-0"
                    }`}
                  />
                  <span className={`font-mono text-[11px] min-w-[18px] ${activeSection === id ? "text-[#8b7dff]" : "text-white/25"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {title}
                </button>
              </li>
            ))}
          </ol>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 lg:border-l lg:border-white/[0.06] lg:pl-16">

          {/* 1 — What this covers */}
          <Section id="what-we-cover" title="What this Privacy Policy Covers">
            <p>
              This Privacy Policy covers how we treat Personal Data that we gather when you access or use our Services. "Personal Data" means any information that identifies or relates to a particular individual and also includes information referred to as "personally identifiable information" or "personal information" under applicable data privacy laws, rules, or regulations.
            </p>
            <p>
              This Privacy Policy does not cover the practices of companies we don't own or control, or people we don't manage.
            </p>
          </Section>

          {/* 2 — Personal Data */}
          <Section id="personal-data" title="Personal Data">
            <h3 className="text-[17px] font-semibold text-white mt-8 mb-4">Categories of Personal Data We Collect</h3>
            <p>This list details the categories of Personal Data that we collect and have collected over the past 12 months:</p>

            <DataCard title="Profile or Contact Data">
              <ul className="pl-5 mt-2 space-y-1.5 text-sm text-white/70 marker:text-white/25">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Account username</li>
                <li>Profile photo (if provided)</li>
              </ul>
            </DataCard>

            <DataCard title="Device & Browser Data">
              <ul className="pl-5 mt-2 space-y-1.5 text-sm text-white/70 marker:text-white/25">
                <li>IP address</li>
                <li>Device type and unique device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URLs</li>
              </ul>
            </DataCard>

            <DataCard title="Workflow & Usage Data">
              <ul className="pl-5 mt-2 space-y-1.5 text-sm text-white/70 marker:text-white/25">
                <li>Workflow configurations and metadata</li>
                <li>Actions performed within the platform</li>
                <li>Service usage statistics and interactions</li>
                <li>Feature preference data</li>
              </ul>
            </DataCard>

            <DataCard title="Payment Data">
              <ul className="pl-5 mt-2 space-y-1.5 text-sm text-white/70 marker:text-white/25">
                <li>Payment card type and last 4 digits</li>
                <li>Billing address</li>
                <li>Transaction history</li>
              </ul>
              <div className="mt-3 text-[13px] text-white/40 bg-[rgba(139,125,255,0.1)] border-l-[3px] border-[#8b7dff] rounded-md px-4 py-3">
                Full payment card numbers are never stored on our servers. Payment processing is handled by our PCI-compliant payment processor.
              </div>
            </DataCard>

            <h3 className="text-[17px] font-semibold text-white mt-8 mb-4">Sources of Personal Data</h3>
            <PrivacyTable
              headers={["Category of Personal Data", "Sources"]}
              rows={[
                ["Profile or Contact Data", "Provided directly by you when creating an account or updating your profile"],
                ["Device & Browser Data", "Collected automatically when you use the Services"],
                ["Workflow & Usage Data", "Collected automatically through your interactions with the platform"],
                ["Payment Data", "Provided directly by you; collected via our payment processor"],
              ]}
            />
          </Section>

          {/* 3 — How We Use */}
          <Section id="how-we-use" title="How We Use Your Personal Data">
            <p>We use your Personal Data for the following purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <UseCard
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />}
                title="Providing the Services"
                desc="To create and manage your account, process your workflows, and provide customer support."
              />
              <UseCard
                icon={<><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>}
                title="Improving the Services"
                desc="To analyze usage patterns, diagnose technical problems, and develop new features."
              />
              <UseCard
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />}
                title="Security & Compliance"
                desc="To protect against fraud, enforce our terms, and comply with legal obligations."
              />
              <UseCard
                icon={<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />}
                title="Communications"
                desc="To send transactional emails, product updates, and respond to your inquiries."
              />
            </div>
          </Section>

          {/* 4 — How We Share */}
          <Section id="how-we-share" title="How We Share Your Personal Data">
            <p>We may share your Personal Data with the following categories of third parties:</p>
            <PrivacyTable
              headers={["Category of Recipient", "Purpose of Sharing"]}
              rows={[
                ["Service Providers", "Hosting, analytics, payment processing, customer support tools, and email delivery services"],
                ["Business Partners", "Integration partners you choose to connect with through our platform"],
                ["Legal Authorities", "When required by law, regulation, or legal process"],
                ["Corporate Transactions", "In connection with a merger, acquisition, or sale of assets"],
              ]}
            />
            <p>
              We do not sell your Personal Data to third parties. We do not share your Personal Data with third parties for their direct marketing purposes.
            </p>
          </Section>

          {/* 5 — Tracking */}
          <Section id="tracking-tools" title="Tracking Tools and Opt-Out">
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities. These tools help us understand how you interact with our Services and allow us to improve your experience.
            </p>
            <h3 className="text-[17px] font-semibold text-white mt-8 mb-4">Types of Cookies We Use</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CookieCard badge="Essential" color="emerald" title="Essential Cookies" desc="Required for the platform to function. These cannot be disabled." />
              <CookieCard badge="Analytics" color="blue" title="Analytics Cookies" desc="Help us understand usage patterns and improve our Services." />
              <CookieCard badge="Functional" color="amber" title="Functional Cookies" desc="Remember your preferences and settings for a better experience." />
            </div>
            <h3 className="text-[17px] font-semibold text-white mt-8 mb-4">Opting Out</h3>
            <p>
              You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking certain cookies may affect the functionality of our Services.
            </p>
            <p>
              For analytics opt-out, you can use browser extensions like Google Analytics Opt-out Add-on or configure your browser's "Do Not Track" setting.
            </p>
          </Section>

          {/* 6 — Data Security */}
          <Section id="data-security" title="Data Security and Retention">
            <p>
              We implement industry-standard security measures to protect your Personal Data, including encryption in transit (TLS 1.3) and at rest (AES-256), regular security audits, and access controls.
            </p>
            <p>
              We retain your Personal Data for as long as your account is active or as needed to provide you the Services. We may also retain and use your data as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <p>
              When you delete your account, we will delete or anonymize your Personal Data within 30 days, except where we are required to retain certain information by law.
            </p>
          </Section>

          {/* 7 — Children */}
          <Section id="children" title="Personal Data of Children">
            <p>
              Our Services are not directed to children under the age of 16. We do not knowingly collect Personal Data from children under 16. If we become aware that a child under 16 has provided us with Personal Data, we will take steps to delete such data.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with Personal Data, please contact us at{" "}
              <a href="mailto:privacy@devonboard.com" className="text-[#8b7dff] hover:underline">privacy@devonboard.com</a>.
            </p>
          </Section>

          {/* 8 — Your Rights */}
          <Section id="your-rights" title="Your Rights">
            <p>Depending on your location, you may have the following rights regarding your Personal Data:</p>
            <div className="flex flex-col gap-1 my-4">
              {[
                { t: "Right to Access", d: "You can request a copy of the Personal Data we hold about you." },
                { t: "Right to Rectification", d: "You can request that we correct inaccurate or incomplete data." },
                { t: "Right to Erasure", d: "You can request that we delete your Personal Data, subject to legal requirements." },
                { t: "Right to Restrict Processing", d: "You can request that we limit how we use your data." },
                { t: "Right to Data Portability", d: "You can request a machine-readable copy of your data." },
                { t: "Right to Object", d: "You can object to processing of your data in certain circumstances." },
              ].map((r) => (
                <div key={r.t} className="flex items-start gap-4 px-5 py-4 rounded-lg hover:bg-white/[0.025] transition-colors duration-200">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#8b7dff] shrink-0 shadow-[0_0_8px_rgba(139,125,255,0.4)]" />
                  <div>
                    <h4 className="text-[15px] font-semibold text-white mb-1">{r.t}</h4>
                    <p className="text-sm text-white/70 !mb-0">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@devonboard.com" className="text-[#8b7dff] hover:underline">privacy@devonboard.com</a>.
              We will respond to your request within 30 days.
            </p>
          </Section>

          {/* 9 — Changes */}
          <Section id="changes" title="Changes to this Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we will notify you by updating the "Effective date" at the top of this page and, where appropriate, sending you an email notification.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your data.
            </p>
          </Section>

          {/* 10 — Contact */}
          <Section id="contact" title="Contact Information" last>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please don't hesitate to reach out:</p>
            <div className="rounded-[10px] border border-white/[0.06] bg-white/[0.025] overflow-hidden my-4">
              {[
                { label: "Email", value: <a href="mailto:privacy@devonboard.com" className="text-[#8b7dff] hover:underline">privacy@devonboard.com</a> },
                { label: "Address", value: "DevOnboard Inc., 123 Innovation Drive, San Francisco, CA 94107" },
                { label: "DPO", value: <a href="mailto:dpo@devonboard.com" className="text-[#8b7dff] hover:underline">dpo@devonboard.com</a> },
              ].map((row, i, arr) => (
                <div key={row.label} className={`flex items-center gap-5 px-6 py-4 text-sm text-white/70 ${i < arr.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/25 min-w-[70px]">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} DevOnboard. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/landingpage" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Home</Link>
            <Link to="/terms" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Terms</Link>
            <Link to="/privacy" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function Section({ id, title, children, last }) {
  return (
    <section
      id={id}
      className={`pb-12 mb-12 scroll-mt-20 ${last ? "" : "border-b border-white/[0.06]"}`}
    >
      <h2 className="text-2xl font-semibold tracking-tight text-white mb-6">{title}</h2>
      <div className="text-[15px] leading-7 text-white/70 [&>p]:mb-4">{children}</div>
    </section>
  );
}

function DataCard({ title, children }) {
  return (
    <div className="my-4 rounded-[10px] border border-white/[0.06] bg-white/[0.025] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
      <h4 className="text-[15px] font-semibold text-white mb-3">{title}</h4>
      {children}
    </div>
  );
}

function PrivacyTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto my-4 rounded-[10px] border border-white/[0.06]">
      <table className="w-full border-collapse">
        <thead className="bg-white/[0.03]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-white/40 px-5 py-3 border-b border-white/[0.06]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.025] transition-colors duration-200">
              {row.map((cell, j) => (
                <td key={j} className={`text-sm text-white/70 leading-relaxed px-5 py-3.5 ${i < rows.length - 1 ? "border-b border-white/[0.06]" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UseCard({ icon, title, desc }) {
  return (
    <div className="rounded-[10px] border border-white/[0.06] bg-white/[0.025] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:-translate-y-0.5">
      <div className="w-10 h-10 rounded-[10px] bg-[rgba(139,125,255,0.12)] flex items-center justify-center mb-4 text-[#8b7dff]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{icon}</svg>
      </div>
      <h4 className="text-[15px] font-semibold text-white mb-2">{title}</h4>
      <p className="text-[13px] text-white/40 leading-relaxed">{desc}</p>
    </div>
  );
}

function CookieCard({ badge, color, title, desc }) {
  const colors = {
    emerald: "text-emerald-400 bg-emerald-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    amber: "text-amber-400 bg-amber-400/10",
  };
  return (
    <div className="rounded-[10px] border border-white/[0.06] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/10">
      <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-3 ${colors[color]}`}>{badge}</span>
      <h4 className="text-[15px] font-semibold text-white mb-1.5">{title}</h4>
      <p className="text-[13px] text-white/40 leading-relaxed">{desc}</p>
    </div>
  );
}
