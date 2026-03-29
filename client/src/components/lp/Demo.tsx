/**
 * デモセクション — LINEチャットのモックUI（スマホ風）
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const messages = [
  { from: "customer", text: "はじめまして。肩こりがひどくて、マッサージを受けたいのですが..." },
  { from: "ai", text: "はじめまして！お問い合わせありがとうございます。肩こりでお悩みなのですね。いつ頃から気になっていますか？" },
  { from: "customer", text: "半年くらい前からです。デスクワークが多くて..." },
  { from: "ai", text: "デスクワークでの肩こり、つらいですよね。当サロンでは、肩・首まわりを重点的にほぐすコースが人気です。まずは60分の体験コースはいかがですか？" },
  { from: "customer", text: "はい、ぜひ受けてみたいです！" },
  { from: "ai", text: "ありがとうございます！ご予約はこちらからどうぞ。ご都合の良い日時をお選びいただけます。\n\nhttps://reserve.laif.app/..." },
];

function ChatBubble({
  msg,
  index,
  visible,
}: {
  msg: (typeof messages)[0];
  index: number;
  visible: boolean;
}) {
  const isCustomer = msg.from === "customer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}
    >
      {!isCustomer && (
        <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center shrink-0 mr-2 mt-1">
          <span className="text-xs font-bold text-sage-dark">AI</span>
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
          isCustomer
            ? "bg-[#5B8C5A] text-white rounded-br-md"
            : "bg-white border border-gray-200 text-warm-brown rounded-bl-md"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

export default function Demo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= messages.length) clearInterval(timer);
    }, 800);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-sage-light/10 to-cream pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sage/40" />
            <span className="text-sage text-lg">&#x1f340;</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sage/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-3">
            AIチャットの様子を見てみましょう
          </h2>
          <p className="text-sm sm:text-base text-warm-brown/50 font-display">
            お客様とAIの会話イメージです
          </p>
        </motion.div>

        {/* Smartphone frame */}
        <div className="max-w-sm mx-auto">
          <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-gray-900/20">
            {/* Notch */}
            <div className="flex justify-center mb-1">
              <div className="w-28 h-6 bg-gray-900 rounded-b-2xl" />
            </div>

            {/* Screen */}
            <div className="bg-[#E8E4DC] rounded-[2rem] overflow-hidden">
              {/* LINE header */}
              <div className="bg-[#5B8C5A] px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">LaiF サポート</p>
                  <p className="text-white/60 text-xs">AI応答中</p>
                </div>
              </div>

              {/* Chat area */}
              <div className="p-4 space-y-3 min-h-[380px] max-h-[420px] overflow-y-auto">
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    msg={msg}
                    index={i}
                    visible={i < visibleCount}
                  />
                ))}
              </div>

              {/* Input area */}
              <div className="bg-white/80 border-t border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-400">
                  メッセージを入力...
                </div>
                <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                  <span className="text-white text-xs">&#x25B6;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
