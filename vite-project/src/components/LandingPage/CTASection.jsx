import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative">
        <div className="text-center">
          {/* Subtle line above */}
          <div className="w-12 h-px bg-white/[0.08] mx-auto mb-16" />

          <h2 className="text-4xl sm:text-[48px] font-bold tracking-[-0.02em] text-white leading-[1.1] mb-6">
            Ready to fix
            <br />
            onboarding forever?
          </h2>
          <p className="text-neutral-500 text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
            Join engineering teams who've eliminated manual setup and give
            every new developer a seamless day one experience.
          </p>

          <Link
            to="/signup"
            className="group inline-flex bg-white hover:bg-neutral-200 px-7 py-3.5 rounded-lg font-semibold text-black text-[14px] transition-all duration-200"
          >
            Start Building Free
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <p className="text-neutral-700 text-[13px] mt-6">
            Free for up to 3 workflows · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
