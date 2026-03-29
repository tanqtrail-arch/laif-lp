/**
 * 返金保証セクション — 30日全額返金
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

export default function Guarantee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cream-dark/20 to-white pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sage/20 p-8 sm:p-10 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-sage-light/50 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-sage-dark" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-warm-brown mb-3">
              30日間 全額返金保証
            </h2>

            <p className="text-sm sm:text-base text-warm-brown/55 leading-relaxed mb-6 max-w-lg mx-auto">
              「自分に合うか不安」——そんな気持ち、よく分かります。
              <br />
              だから、30日間使ってみて「違うな」と思ったら、
              <br className="hidden sm:block" />
              理由を問わず全額お返しします。
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-light/40 border border-sage/15">
              <span className="text-sm text-sage-dark font-medium font-display">
                リスクなしで、まずはお試しください
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
