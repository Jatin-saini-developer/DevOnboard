import { Link } from "react-router-dom";

/* ── Contribution areas ── */
const areas = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    ),
    title: "Frontend Development",
    desc: "Help us build beautiful, accessible UI components using React and Tailwind CSS. From micro-interactions to full page layouts.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 110 6m-16.5-3H1.5m16.5 0H22.5m-13.5-6h7.5"
      />
    ),
    title: "Backend & APIs",
    desc: "Improve our backend services, build new API endpoints, and help scale our infrastructure for growing teams.",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    ),
    title: "Documentation",
    desc: "Write guides, tutorials, and API docs. Great documentation makes great software accessible to everyone.",
    tags: ["Markdown", "Technical Writing", "Tutorials"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    ),
    title: "Feature Ideas",
    desc: "Propose and discuss new features. Share your vision for what developer onboarding should look like.",
    tags: ["Product", "UX Research", "Ideation"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152-6.135 3.001 3.001 0 00-2.564-2.95A21.9 21.9 0 0012 4.875a21.9 21.9 0 00-4.491.48 3.001 3.001 0 00-2.564 2.95 23.917 23.917 0 01-1.152 6.135c2.56-.932 5.324-1.44 8.207-1.44z"
      />
    ),
    title: "Bug Reports & Testing",
    desc: "Help us catch bugs, write tests, and improve reliability. Every issue report makes DevOnboard better for everyone.",
    tags: ["QA", "Jest", "Testing"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
      />
    ),
    title: "Integrations",
    desc: "Build connectors for new tools and services. Help DevOnboard work with the tools developers already love.",
    tags: ["APIs", "OAuth", "Webhooks"],
  },
];

/* ── How to contribute steps ── */
const steps = [
  {
    step: "01",
    title: "Find an issue",
    desc: "Browse open issues labeled 'good first issue' or 'help wanted' on our GitHub repository.",
  },
  {
    step: "02",
    title: "Fork & branch",
    desc: "Fork the repo, create a feature branch, and start building. Follow our contribution guidelines.",
  },
  {
    step: "03",
    title: "Submit a PR",
    desc: "Open a pull request with a clear description. We'll review it and provide feedback promptly.",
  },
  {
    step: "04",
    title: "Get merged",
    desc: "Once approved, your contribution gets merged. You'll be credited as a contributor to DevOnboard.",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-[#08090a] text-gray-100 antialiased font-['Inter',sans-serif]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-white no-underline"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] border border-white/[0.06]">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <span className="text-[17px] font-semibold tracking-tight">
              DevOnboard
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/landingpage"
              className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-200 hidden sm:block"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-white/40 hover:text-white transition-colors duration-200 hidden sm:block"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold text-black bg-white px-4 py-2 rounded-lg hover:bg-neutral-200 transition-all duration-200"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative text-center pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 overflow-hidden">
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,125,255,0.06),transparent_70%)] pointer-events-none" />
        <p className="relative text-sm font-medium text-[#8b7dff] mb-4">
          Open Source
        </p>
        <h1 className="relative text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-tighter leading-[1.08] text-white max-w-3xl mx-auto">
          We're not hiring.
          <br className="hidden sm:block" />
          <span className="text-white/40">We're building together.</span>
        </h1>
        <p className="relative mt-6 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
          DevOnboard is a solo project — but it doesn't have to be built alone.
          We welcome open source contributors who want to shape the future of
          developer onboarding.
        </p>
        <div className="relative mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://github.com/Jatin-saini-developer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-all duration-200 no-underline"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            View on GitHub
          </a>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white/70 border border-white/[0.1] rounded-lg hover:bg-white/[0.04] hover:text-white transition-all duration-200 no-underline"
          >
            About us
          </Link>
        </div>
      </section>

      {/* ── Philosophy banner ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left — message */}
            <div className="lg:col-span-3 px-8 sm:px-12 py-12 lg:border-r border-white/[0.06]">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="text-[#8b7dff]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#8b7dff]">
                  Our philosophy
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.2] text-white mb-6">
                Open source at heart.{" "}
                <span className="text-white/40">Community by design.</span>
              </h2>
              <div className="text-[15px] leading-7 text-white/50 space-y-4">
                <p>
                  DevOnboard is built by a solo developer, but the best tools
                  are shaped by their communities. I believe that open source
                  isn't just about code — it's about building something
                  meaningful together.
                </p>
                <p>
                  Whether you're a seasoned engineer or making your first open
                  source contribution, there's a place for you here. Every pull
                  request, bug report, and feature suggestion makes DevOnboard
                  better for everyone.
                </p>
                <p>
                  No interviews. No applications. Just find something that
                  interests you, and start contributing.
                </p>
              </div>
            </div>

            {/* Right — quick stats */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
                  label: "Every contribution counts",
                  sublabel:
                    "From typo fixes to major features — all contributions are valued equally.",
                },
                {
                  icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
                  label: "You'll be credited",
                  sublabel:
                    "All contributors are recognized in our README and release notes.",
                },
                {
                  icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
                  label: "Async & flexible",
                  sublabel:
                    "Contribute on your own schedule. No standups, no deadlines, no pressure.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-4 px-8 py-7 ${
                    i < 2
                      ? "border-b border-white/[0.06]"
                      : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-[8px] bg-[rgba(139,125,255,0.1)] flex items-center justify-center text-[#8b7dff]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-white mb-1">
                      {item.label}
                    </h4>
                    <p className="text-[13px] leading-relaxed text-white/40">
                      {item.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contribution Areas ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#8b7dff] mb-4">
            Where you can help
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white">
            Contribution areas
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Pick an area that matches your skills and interests. Every
            contribution, big or small, moves the project forward.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <div
              key={area.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(139,125,255,0.1)] flex items-center justify-center mb-5 text-[#8b7dff] group-hover:bg-[rgba(139,125,255,0.15)] transition-colors duration-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {area.icon}
                </svg>
              </div>
              <h3 className="text-[16px] font-semibold text-white mb-2">
                {area.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-white/40 group-hover:text-white/50 transition-colors duration-300 mb-4">
                {area.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] text-white/30 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to contribute ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#8b7dff] mb-4">
            Getting started
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white">
            How to contribute
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Four simple steps from finding an issue to seeing your code in
            production.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]"
            >
              <span className="text-[48px] font-bold leading-none text-white/[0.04] absolute top-5 right-6 select-none group-hover:text-white/[0.06] transition-colors duration-300">
                {s.step}
              </span>
              <div className="relative">
                <span className="inline-block text-[11px] font-mono font-medium text-[#8b7dff] bg-[rgba(139,125,255,0.1)] px-2.5 py-1 rounded-md mb-4">
                  Step {s.step}
                </span>
                <h3 className="text-[16px] font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-white/40 group-hover:text-white/50 transition-colors duration-300">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[#8b7dff] mb-4">
              Why contribute
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              What's in it for you?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
                title: "Learn & grow",
                desc: "Work on a real product and sharpen your skills with hands-on experience.",
              },
              {
                icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
                title: "Join a community",
                desc: "Connect with developers who share your passion for building great tools.",
              },
              {
                icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.016 6.016 0 01-4.27 1.772 6.016 6.016 0 01-4.27-1.772",
                title: "Build your portfolio",
                desc: "Your contributions are public, visible, and speak louder than any résumé.",
              },
              {
                icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
                title: "Shape the product",
                desc: "Have a real impact on a product used by developer teams around the world.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(139,125,255,0.1)] flex items-center justify-center mx-auto mb-4 text-[#8b7dff]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h4 className="text-[14px] font-semibold text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-white/40">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 sm:py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,125,255,0.04),transparent_70%)] pointer-events-none" />
        <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-4 leading-tight">
          Ready to contribute?
        </h2>
        <p className="relative text-white/40 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Jump into the codebase, pick an issue, and start building. No
          permission needed — just a GitHub account and curiosity.
        </p>
        <div className="relative flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://github.com/Jatin-saini-developer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-all duration-200 no-underline"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Start contributing
          </a>
          <a
            href="https://x.com/Jatin___Saini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white/70 border border-white/[0.1] rounded-lg hover:bg-white/[0.04] hover:text-white transition-all duration-200 no-underline"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Say hi on X
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/25">
            © {new Date().getFullYear()} DevOnboard. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/landingpage"
              className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/careers"
              className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
            >
              Careers
            </Link>
            <Link
              to="/privacy"
              className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              to="/security"
              className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
            >
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
