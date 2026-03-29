/**
 * LaiF Landing Page - Home
 * Design: Botanical Watercolor Storytelling
 * Colors: Sage Green (#8FAE8B) + Blush Pink (#D4A0A0) + Cream (#FBF8F3)
 * Typography: Noto Serif JP (headings) + Noto Sans JP (body) + Zen Maru Gothic (display)
 */

import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
