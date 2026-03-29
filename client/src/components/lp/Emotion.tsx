/**
 * 感情訴求セクション — 「もう、ひとりで全部やらなくて、いい。」
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Emotion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush-light/15 to-cream pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blush/4 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-warm-brown leading-relaxed mb-8"
          >
            もう、ひとりで
            <br />
            全部やらなくて、いい。
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-sm sm:text-base text-warm-brown/50 leading-loose max-w-lg mx-auto">
              朝から晩まで走り続けて、
              <br />
              それでも「もっとちゃんとしなきゃ」って思っていませんか。
              <br />
              <br />
              あなたが頑張ってきたこと、ちゃんと知っています。
              <br />
              だから、少しだけ頼ってみてください。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
