/**
 * LaiF Landing Page - Home
 * セクション構成:
 * 1. ヒーロー → 2. 共感 → 3. 悩み → 4. 解決 → 5. 強み
 * → 6. 返金保証 → 7. デモ → 8. 感情訴求 → 9. CTA
 */

import Hero from "@/components/lp/Hero";
import Empathy from "@/components/lp/Empathy";
import Pain from "@/components/lp/Pain";
import Solution from "@/components/lp/Solution";
import Strength from "@/components/lp/Strength";
import Guarantee from "@/components/lp/Guarantee";
import Demo from "@/components/lp/Demo";
import Emotion from "@/components/lp/Emotion";
import CtaSection from "@/components/lp/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <Empathy />
      <Pain />
      <Solution />
      <Strength />
      <Guarantee />
      <Demo />
      <Emotion />
      <CtaSection />
      <Footer />
    </div>
  );
}
