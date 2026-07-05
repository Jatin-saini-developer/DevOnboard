import Navbar from "../components/LandingPage/Navbar"
import ChatBot from "../components/ChatBot/ChatBot"
import HeroSection from "../components/LandingPage/HeroSection"
import LogoCloud from "../components/LandingPage/LogoCloud"
import ProblemSolution from "../components/LandingPage/ProblemSolution"
import HowItWorks from "../components/LandingPage/HowItWorks"
import Features from "../components/LandingPage/Features"
import Testimonials from "../components/LandingPage/Testimonials"
import FAQ from "../components/LandingPage/FAQ"
import CTASection from "../components/LandingPage/CTASection"
import Footer from "../components/LandingPage/Footer"

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen antialiased">
      <Navbar />
      <HeroSection />
      <LogoCloud />
      <div id="features">
        <Features />
      </div>
      <ProblemSolution />
      <HowItWorks />
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <CTASection />
      <Footer />

      {/* ── ChatBot widget — fixed overlay, always on top ── */}
      <ChatBot />
    </div>
  )
}

export default LandingPage