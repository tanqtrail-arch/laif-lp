/**
 * CTA Section - まずはAIチャットを体験してみる
 * Final call-to-action with watercolor background
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/hero-bg-U2oaWvKtpPLiXWo2UexE3L.webp";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/60 to-cream/80" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Decorative clover */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-sage/60 text-2xl">🍀</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-4 leading-relaxed">
            あなたの時間を
            <br />
            取り戻しませんか？
          </h2>

          <p className="text-sm sm:text-base text-warm-brown/55 leading-relaxed mb-10 max-w-lg mx-auto">
            LINE対応、予約管理、顧客管理。
            <br />
            毎日の「手が回らない」をLaiFが解決します。
            <br />
            まずは無料でお試しください。
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-sage text-white font-display text-base sm:text-lg shadow-lg shadow-sage/25 hover:bg-sage-dark hover:shadow-xl hover:shadow-sage/35 transition-all duration-300 hover:-translate-y-0.5"
            >
              まずはAIチャットを体験してみる
              <span className="text-xl">›</span>
            </a>
          </motion.div>

          {/* Sub note */}
          <p className="text-xs text-warm-brown/40 mt-5">
            無料で始められます・クレジットカード不要
          </p>
        </motion.div>
      </div>
    </section>
  );
}
