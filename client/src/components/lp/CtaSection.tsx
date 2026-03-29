/**
 * CTA セクション — LINEで無料相談する
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/hero-bg-U2oaWvKtpPLiXWo2UexE3L.webp";

export default function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
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
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-4 leading-relaxed">
            まずは、話してみませんか？
          </h2>

          <p className="text-sm sm:text-base text-warm-brown/55 leading-relaxed mb-10 max-w-lg mx-auto">
            導入のご相談から使い方のサポートまで、
            <br />
            LINEでいつでもお気軽にどうぞ。
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#06C755] text-white font-display text-base sm:text-lg shadow-lg shadow-[#06C755]/25 hover:bg-[#05b34d] hover:shadow-xl hover:shadow-[#06C755]/35 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで無料相談する
            </a>
          </motion.div>

          <p className="text-xs text-warm-brown/40 mt-5">
            無料で始められます・クレジットカード不要
          </p>
        </motion.div>
      </div>
    </section>
  );
}
