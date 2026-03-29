/**
 * Testimonials Section - お客様の声
 * Watercolor-styled testimonial cards
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "佐藤 あゆみ",
    role: "エステサロン経営",
    text: "LINE対応に毎日2時間以上かかっていたのが、LaiFを導入してからほぼゼロに。空いた時間で新しいメニューの開発ができるようになりました。",
    highlight: "LINE対応がほぼゼロに",
  },
  {
    name: "田中 美咲",
    role: "パーソナルコーチ",
    text: "顧客カルテのおかげで、お客様一人ひとりの悩みや経緯を忘れずに対応できるように。「覚えていてくれたんですね」と喜ばれることが増えました。",
    highlight: "一人ひとりに寄り添える",
  },
  {
    name: "鈴木 はるか",
    role: "ネイルサロンオーナー",
    text: "予約管理がバラバラだったのが一元化されて、ダブルブッキングがなくなりました。ダッシュボードで売上も見えるから経営の不安が減りました。",
    highlight: "経営の不安が減った",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-sage-light/50 p-6 sm:p-7 h-full hover:shadow-md hover:shadow-sage/8 transition-all duration-300 hover:-translate-y-1">
        {/* Quote icon */}
        <div className="mb-4">
          <Quote className="w-8 h-8 text-blush/30" />
        </div>

        {/* Highlight badge */}
        <div className="inline-block px-3 py-1 rounded-full bg-blush-light/50 border border-blush/15 mb-4">
          <span className="text-xs font-medium text-blush">{testimonial.highlight}</span>
        </div>

        {/* Testimonial text */}
        <p className="text-sm sm:text-base text-warm-brown/70 leading-relaxed mb-6">
          {testimonial.text}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-sage-light/30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-light to-blush-light flex items-center justify-center">
            <span className="text-sm font-medium text-warm-brown/60">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-brown">{testimonial.name}</p>
            <p className="text-xs text-warm-brown/50">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-dark/30 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blush/40" />
            <span className="text-blush text-lg">♥</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blush/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-3">
            お客様の声
          </h2>
          <p className="text-sm sm:text-base text-warm-brown/50 font-display">
            LaiFを使ってくださっている方々の声をご紹介します
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
