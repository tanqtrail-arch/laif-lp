/**
 * Hero Section - LaiF LP
 * Full-width watercolor background with logo, tagline, and CTA
 */

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/hero-bg-U2oaWvKtpPLiXWo2UexE3L.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/laif-logo-transparent_61833de3.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Soft overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Logo - use mix-blend-mode to remove white background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="relative w-56 sm:w-72 md:w-80 mx-auto">
            <img
              src={LOGO}
              alt="LaiF - Life × AI × Freedom"
              className="w-full drop-shadow-sm"
  
            />
          </div>
        </motion.div>

        {/* Main Catch Copy */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-warm-brown mb-8"
        >
          空いた時間は、
          <br className="sm:hidden" />
          <span className="text-sage-dark">大切なこと</span>に
          <br />
          使ってほしい
        </motion.h1>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-sm sm:text-base text-warm-brown/60 leading-relaxed mb-10 max-w-lg mx-auto"
        >
          LINE対応、予約管理、顧客カルテ。
          <br />
          あなたの「手が回らない」をAIがやさしくサポートします。
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sage text-white font-display text-sm sm:text-base shadow-lg shadow-sage/20 hover:bg-sage-dark hover:shadow-xl hover:shadow-sage/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            まずはAIチャットを体験してみる
            <span className="text-lg">›</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-sage/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
