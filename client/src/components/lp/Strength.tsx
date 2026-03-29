/**
 * 強みセクション — 「顧客は、ヒアリング済みで来る」
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircleHeart, UserCheck, Sparkles } from "lucide-react";

const points = [
  {
    icon: MessageCircleHeart,
    title: "AIが事前にヒアリング",
    body: "お客様がLINEで問い合わせた時点で、AIが悩みや希望をやさしく聞き取り。あなたが対応する前に、情報が整っています。",
  },
  {
    icon: UserCheck,
    title: "来店時にはもう準備万端",
    body: "「この方は肩こりがひどくて、週1回を希望」——カルテを見るだけで、最適な提案ができます。",
  },
  {
    icon: Sparkles,
    title: "お客様も安心して来れる",
    body: "「ちゃんと伝わっている」という安心感。初回からリピートにつながる信頼の土台を、AIがつくります。",
  },
];

export default function Strength() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blush/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sage/40" />
            <span className="text-sage text-lg">&#x1f340;</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sage/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-4 leading-relaxed">
            LaiFの強み
          </h2>
          <p className="font-display text-lg sm:text-xl text-sage-dark font-medium">
            「顧客は、ヒアリング済みで来る」
          </p>
          <p className="text-sm text-warm-brown/50 mt-2 max-w-md mx-auto">
            あなたが会う前に、AIがお客様の気持ちを整えておきます
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {points.map((point, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="bg-gradient-to-br from-white to-sage-light/15 rounded-2xl border border-sage/15 p-6 sm:p-7 h-full hover:shadow-md hover:shadow-sage/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center mb-5">
                    <point.icon className="w-6 h-6 text-sage-dark" />
                  </div>
                  <h3 className="font-serif text-lg text-warm-brown font-semibold mb-3">
                    {point.title}
                  </h3>
                  <p className="text-sm text-warm-brown/55 leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
