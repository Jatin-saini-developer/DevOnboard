import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const sections = [
  { id: "the-service", title: "The Service" },
  { id: "accounts-access", title: "Accounts & Access" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "payment-billing", title: "Payment & Billing" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "term-termination", title: "Term & Termination" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "limitation-liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "general", title: "General Terms" },
];

export default function Terms() {
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
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,125,255,0.08),transparent_70%)] pointer-events-none" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.12em] text-[#8b7dff] mb-4">Legal</p>
        <h1 className="relative text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tighter leading-[1.1] text-white">Terms of Service</h1>
        <p className="relative mt-5 text-[13px] font-mono text-white/40 uppercase tracking-wider">Effective date: July 01, 2025</p>
      </div>

      {/* ── Intro ── */}
      <div className="max-w-[720px] mx-auto px-6 pb-16 text-center">
        <p className="text-base leading-7 text-white/70 mb-4">
          These Terms of Service (<strong className="text-white/90">"Agreement"</strong>) govern your access to and use of the DevOnboard platform and related services (the <strong className="text-white/90">"Service"</strong>).{" "}
          <strong className="text-white/90">
            By accessing or using our Service in any manner, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, you may not access or use the Service.
          </strong>
        </p>
        <p className="text-base leading-7 text-white/70">
          Please also review our{" "}
          <Link to="/privacy" className="text-[#8b7dff] hover:underline">Privacy Policy</Link>, which describes how we collect and use personal data in connection with the Service.
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

          {/* 1 — The Service */}
          <Section id="the-service" title="The Service">
            <Clause num="1.1" heading="Service Description">
              <p>
                DevOnboard provides a cloud-based workflow automation platform (the "Service") that enables users to design, build, and deploy automated workflows through a visual interface. The Service includes tools for connecting third-party applications, processing data, and managing integrations across your software stack.
              </p>
              <p>
                Any content you post, upload, share, store, or otherwise provide through the Service is considered a "User Submission." You are solely responsible for all User Submissions you contribute to the Service.
              </p>
            </Clause>
            <Clause num="1.2" heading="Service Availability">
              <p>
                We strive to maintain high availability of the Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable for scheduled maintenance, upgrades, or due to circumstances beyond our reasonable control. We will make commercially reasonable efforts to provide advance notice of any planned downtime.
              </p>
            </Clause>
            <Clause num="1.3" heading="Service Modifications">
              <p>
                DevOnboard reserves the right to modify, suspend, or discontinue any aspect of the Service at any time, including the availability of any features, databases, or content. We may also impose limits on certain features and services or restrict your access to parts or all of the Service without notice or liability.
              </p>
            </Clause>
          </Section>

          {/* 2 — Accounts & Access */}
          <Section id="accounts-access" title="Accounts & Access">
            <Clause num="2.1" heading="Account Registration">
              <p>
                To use certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information and to keep this information up to date. You are responsible for safeguarding the password associated with your account and for all activities that occur under your credentials.
              </p>
            </Clause>
            <Clause num="2.2" heading="Account Security">
              <p>
                You must notify DevOnboard immediately of any unauthorized access to or use of your account. DevOnboard will not be liable for any losses arising from unauthorized use of your account, but you may be held liable for losses incurred by DevOnboard or third parties due to such unauthorized use.
              </p>
            </Clause>
            <Clause num="2.3" heading="Age Requirements">
              <p>
                The Service is not intended for use by anyone under the age of 16. By agreeing to these Terms, you represent that you are at least 16 years old. If we learn that we have collected personal data from a child under 16, we will take steps to delete such information promptly.
              </p>
            </Clause>
          </Section>

          {/* 3 — Acceptable Use */}
          <Section id="acceptable-use" title="Acceptable Use">
            <p>You agree not to misuse the Service. The following restrictions apply to your use of the Service. You may not:</p>
            <ul className="pl-5 mt-4 space-y-2 text-sm text-white/70 marker:text-white/25 list-disc">
              <li>Use the Service for any unlawful purpose or to violate any applicable laws or regulations.</li>
              <li>Interfere with, disrupt, or place an undue burden on the Service or any servers, systems, or networks connected to the Service.</li>
              <li>Attempt to gain unauthorized access to any part of the Service, other accounts, or computer systems or networks connected to the Service.</li>
              <li>Use the Service to transmit malware, viruses, or any other malicious code.</li>
              <li>Scrape, data mine, or use automated means to access the Service without our express written permission.</li>
              <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service.</li>
              <li>Use the Service in any manner that could damage, disable, overburden, or impair it.</li>
              <li>Resell, sublicense, or otherwise make the Service available to any third party without authorization.</li>
            </ul>
            <InfoCallout>
              Violation of these acceptable use terms may result in immediate suspension or termination of your account and access to the Service, at our sole discretion.
            </InfoCallout>
          </Section>

          {/* 4 — Payment & Billing */}
          <Section id="payment-billing" title="Payment & Billing">
            <Clause num="4.1" heading="Pricing & Plans">
              <p>
                Certain features of the Service may require a paid subscription. You agree to pay all fees associated with your chosen plan as described on our pricing page. Fees are non-refundable except as expressly set forth in this Agreement or as required by applicable law.
              </p>
            </Clause>
            <Clause num="4.2" heading="Billing Cycle">
              <p>
                Subscriptions are billed in advance on a recurring basis (monthly or annually, as selected by you). Your subscription will automatically renew at the end of each billing cycle unless you cancel it before the renewal date. You may cancel your subscription at any time through your account settings.
              </p>
            </Clause>
            <Clause num="4.3" heading="Taxes">
              <p>
                All fees are exclusive of applicable taxes (including VAT, GST, and sales tax), which you are responsible for paying. If we are required to collect or pay taxes on your behalf, such taxes will be charged in addition to the subscription fees.
              </p>
            </Clause>
            <Clause num="4.4" heading="Price Changes">
              <p>
                DevOnboard reserves the right to modify its pricing at any time. Any price changes will take effect at the start of the next billing cycle following notice to you. Your continued use of the Service after a price change constitutes your agreement to the new pricing.
              </p>
            </Clause>
          </Section>

          {/* 5 — Intellectual Property */}
          <Section id="intellectual-property" title="Intellectual Property">
            <Clause num="5.1" heading="DevOnboard's Ownership">
              <p>
                DevOnboard owns all rights, title, and interest in and to the Service, including all related intellectual property rights (patents, copyrights, trademarks, trade secrets, and other proprietary rights). The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Nothing in these Terms grants you any right to use the DevOnboard name, trademarks, logos, domain names, or other distinctive brand features.
              </p>
            </Clause>
            <Clause num="5.2" heading="Your Content">
              <p>
                You retain ownership of any content and data you submit, post, or display on or through the Service ("Your Content"). By submitting Your Content, you grant DevOnboard a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display Your Content solely for the purpose of operating and providing the Service to you.
              </p>
            </Clause>
            <Clause num="5.3" heading="Feedback">
              <p>
                If you provide us with any feedback, suggestions, or ideas regarding the Service ("Feedback"), you assign to DevOnboard all rights in the Feedback and agree that DevOnboard may use such Feedback without restriction or obligation to you.
              </p>
            </Clause>
          </Section>

          {/* 6 — Third-Party Services */}
          <Section id="third-party-services" title="Third-Party Services">
            <p>
              The Service may integrate with or contain links to third-party websites, applications, or services ("Third-Party Services") that are not owned or controlled by DevOnboard. We have no control over and assume no responsibility for the content, privacy policies, or practices of any Third-Party Services.
            </p>
            <p>
              Your use of Third-Party Services is governed by the terms of service and privacy policies of those third parties. DevOnboard will not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any Third-Party Services.
            </p>
            <InfoCallout>
              We recommend reviewing the terms and privacy policies of any Third-Party Service before integrating it with your DevOnboard workflows.
            </InfoCallout>
          </Section>

          {/* 7 — Term & Termination */}
          <Section id="term-termination" title="Term & Termination">
            <Clause num="7.1" heading="Term">
              <p>
                These Terms are effective from the date you first access or use the Service and continue until terminated by either party. Paid subscription terms are governed by the applicable subscription period you selected at the time of purchase.
              </p>
            </Clause>
            <Clause num="7.2" heading="Termination by You">
              <p>
                You may terminate your account at any time by contacting us or through your account settings. Upon termination, your right to use the Service will cease immediately. Any fees already paid are non-refundable, and you will remain responsible for any outstanding amounts owed.
              </p>
            </Clause>
            <Clause num="7.3" heading="Termination by DevOnboard">
              <p>
                DevOnboard may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Reasons for termination may include, but are not limited to, breach of these Terms, failure to pay applicable fees, or conduct that we determine to be harmful to other users or the Service.
              </p>
            </Clause>
            <Clause num="7.4" heading="Effect of Termination">
              <p>
                Upon termination, your right to access and use the Service will immediately cease. We may delete your account and all associated data within 30 days of termination, unless we are required to retain it by applicable law. Sections of this Agreement that by their nature should survive termination shall remain in full force and effect.
              </p>
            </Clause>
          </Section>

          {/* 8 — Disclaimers */}
          <Section id="disclaimers" title="Disclaimers">
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. DEVONBOARD EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p>
              DevOnboard does not warrant that the Service will be uninterrupted, secure, or error-free, that defects will be corrected, or that the Service or the servers that make it available are free of viruses or other harmful components. DevOnboard does not warrant or make any representations regarding the use or the results of the use of the Service in terms of correctness, accuracy, reliability, or otherwise.
            </p>
          </Section>

          {/* 9 — Limitation of Liability */}
          <Section id="limitation-liability" title="Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DEVONBOARD, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="pl-5 mt-4 space-y-2 text-sm text-white/70 marker:text-white/25 list-disc">
              <li>Your access to or use of, or inability to access or use, the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service;</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
            </ul>
            <p className="mt-4">
              IN NO EVENT SHALL DEVONBOARD'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE EXCEED THE GREATER OF (A) THE AMOUNTS YOU HAVE PAID TO DEVONBOARD IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100).
            </p>
          </Section>

          {/* 10 — Indemnification */}
          <Section id="indemnification" title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless DevOnboard and its officers, directors, employees, contractors, agents, licensors, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="pl-5 mt-4 space-y-2 text-sm text-white/70 marker:text-white/25 list-disc">
              <li>Your use of the Service;</li>
              <li>Your violation of these Terms;</li>
              <li>Your violation of any third-party right, including any intellectual property or privacy right;</li>
              <li>Any claim that Your Content caused damage to a third party.</li>
            </ul>
            <p className="mt-4">
              This defense and indemnification obligation will survive termination of these Terms and your use of the Service.
            </p>
          </Section>

          {/* 11 — Confidentiality */}
          <Section id="confidentiality" title="Confidentiality">
            <Clause num="11.1" heading="Confidential Information">
              <p>
                Each party acknowledges that in the course of using the Service, it may receive information that is confidential or proprietary to the other party ("Confidential Information"). Confidential Information includes, but is not limited to, trade secrets, technical data, business plans, product plans, financial information, and customer lists.
              </p>
            </Clause>
            <Clause num="11.2" heading="Obligations">
              <p>
                Each party agrees to hold the other party's Confidential Information in strict confidence and not to disclose it to any third party except as necessary to fulfill its obligations under this Agreement. The receiving party shall use the same degree of care to protect the disclosing party's Confidential Information as it uses to protect its own, but in no event less than reasonable care.
              </p>
            </Clause>
            <Clause num="11.3" heading="Exceptions">
              <p>
                Confidential Information does not include information that: (a) is or becomes publicly available without breach of this Agreement; (b) was known to the receiving party prior to disclosure; (c) is independently developed without reference to the Confidential Information; or (d) is rightfully received from a third party without restriction on disclosure.
              </p>
            </Clause>
          </Section>

          {/* 12 — General Terms */}
          <Section id="general" title="General Terms" last>
            <Clause num="12.1" heading="Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in Delaware.
              </p>
            </Clause>
            <Clause num="12.2" heading="Entire Agreement">
              <p>
                These Terms constitute the entire agreement between you and DevOnboard regarding the use of the Service and supersede all prior agreements, understandings, negotiations, and discussions, whether oral or written.
              </p>
            </Clause>
            <Clause num="12.3" heading="Severability">
              <p>
                If any provision of these Terms is held to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions shall continue in full force and effect.
              </p>
            </Clause>
            <Clause num="12.4" heading="Waiver">
              <p>
                No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term. DevOnboard's failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.
              </p>
            </Clause>
            <Clause num="12.5" heading="Assignment">
              <p>
                You may not assign or transfer these Terms or your rights under these Terms, in whole or in part, without the prior written consent of DevOnboard. DevOnboard may assign its rights and obligations under these Terms without your consent in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of its assets.
              </p>
            </Clause>
            <Clause num="12.6" heading="Contact Us">
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@devonboard.com" className="text-[#8b7dff] hover:underline">legal@devonboard.com</a>.
              </p>
            </Clause>
          </Section>

        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6 mt-8">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/25">© {new Date().getFullYear()} DevOnboard. All rights reserved.</p>
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

function Clause({ num, heading, children }) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[13px] text-white/25">{num}</span>
        <h3 className="text-[17px] font-semibold text-white">{heading}</h3>
      </div>
      <div className="text-[15px] leading-7 text-white/70 [&>p]:mb-4">{children}</div>
    </div>
  );
}

function InfoCallout({ children }) {
  return (
    <div className="mt-5 text-[13px] text-white/50 bg-[rgba(139,125,255,0.07)] border-l-[3px] border-[#8b7dff] rounded-md px-5 py-4 leading-relaxed">
      {children}
    </div>
  );
}
