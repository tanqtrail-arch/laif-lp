/**
 * How It Works Section - 使い方ガイド (STEP 1-4)
 * Watercolor card layout with step illustrations
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const STEP1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/step1-chat-fixed_5fea5c09.png";
const STEP2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/step2-ai-gVgFjptvsZGJHP4r9FXfnp.webp";
const STEP3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/step3-calendar-EKCKWCM8uwgMt6QHpzC6xZ.webp";
const STEP4 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/step4-karte-EDnHKhKn9fQruNKvAy5nsf.webp";

const steps = [
  {
    num: 1,
    title: "AIチャットで相談",
    desc: "LINEで気軽に相談",
    detail: "お客様がLINEで問い合わせると、AIが自然な会話で対応。24時間いつでも、あなたの代わりに丁寧にお答えします。",
    image: STEP1,
  },
  {
    num: 2,
    title: "AIがヒアリング",
    desc: "AIが内容を自動整理",
    detail: "会話の中からお客様のニーズや悩みをAIが自動で把握。大切な情報を見逃しません。",
    image: STEP2,
  },
  {
    num: 3,
    title: "予約へご案内",
    desc: "カンタン予約リンク",
    detail: "最適なタイミングで予約ページへスムーズにご案内。お客様も迷わず予約完了できます。",
    image: STEP3,
  },
  {
    num: 4,
    title: "顧客カルテに記録",
    desc: "会話内容を自動保存",
    detail: "すべての会話と顧客情報がカルテに自動蓄積。次回の対応もスムーズに。",
    image: STEP4,
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group"
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-light/60 p-6 shadow-sm hover:shadow-md hover:shadow-sage/10 transition-all duration-300 hover:-translate-y-1 h-full">
        {/* Step badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-light/60 border border-sage/20 mb-4">
          <span className="text-xs font-medium text-sage-dark tracking-wider">STEP</span>
          <span className="text-sm font-bold text-sage-dark font-display">{step.num}</span>
        </div>

        {/* Illustration */}
        <div className="w-full aspect-square max-w-[180px] mx-auto mb-4 relative rounded-xl overflow-hidden bg-white/50">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text */}
        <h3 className="font-serif text-lg sm:text-xl text-warm-brown font-semibold mb-1">
          {step.title}
        </h3>
        <p className="text-sm text-sage-dark font-medium mb-3">{step.desc}</p>
        <p className="text-xs sm:text-sm text-warm-brown/60 leading-relaxed">
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      {/* Subtle watercolor background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-sage-light/10 to-white/0 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sage/40" />
            <span className="text-sage text-lg">🍀</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sage/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-3">
            はじめてでも簡単に使えます
          </h2>
          <p className="text-sm sm:text-base text-warm-brown/50 font-display">
            難しい操作は一切ありません
          </p>
        </motion.div>

        {/* Step flow badges (horizontal) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {[
            { num: 1, label: "AIチャットで相談" },
            { num: 2, label: "自動ヒアリング" },
            { num: 3, label: "予約ページへ" },
            { num: 4, label: "顧客カルテに蓄積" },
          ].map((item, i) => (
            <div
              key={item.num}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-dark/80 border border-sage/15 text-xs sm:text-sm text-warm-brown/70"
            >
              <span className="w-5 h-5 rounded-full bg-sage/20 text-sage-dark text-xs font-bold flex items-center justify-center">
                {item.num}
              </span>
              {item.label}
              {i < 3 && <span className="text-sage/30 ml-1 hidden sm:inline">→</span>}
            </div>
          ))}
        </motion.div>

        {/* Step cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
