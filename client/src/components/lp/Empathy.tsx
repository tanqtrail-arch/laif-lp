/**
 * 共感セクション — ママの日常
 * 3枚のカードで日常のリアルな場面を描写
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, NotebookPen, Moon } from "lucide-react";

const scenes = [
  {
    icon: Smartphone,
    time: "朝 7:30",
    title: "お弁当を作りながら、LINEが3件",
    body: "「明日空いてますか？」「メニュー教えてください」——返信したいけど、手が離せない。既読だけがついていく。",
  },
  {
    icon: NotebookPen,
    time: "昼 13:00",
    title: "施術の合間に、予約帳をめくる",
    body: "ノート、LINE、カレンダーアプリ。どこに何を書いたか分からなくて、ダブルブッキング寸前。",
  },
  {
    icon: Moon,
    time: "夜 22:30",
    title: "子どもを寝かしつけた後、DM返信",
    body: "今日も一日おつかれさま。でも、まだやることが残っている。本当は少し休みたいのに。",
  },
];

export default function Empathy() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush-light/20 to-cream pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm text-blush font-display mb-3">毎日、おつかれさまです</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown leading-relaxed">
            こんな毎日、
            <br className="sm:hidden" />
            送っていませんか？
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {scenes.map((scene, i) => {
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
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-blush/20 p-6 sm:p-7 h-full hover:shadow-md hover:shadow-blush/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blush-light/60 flex items-center justify-center">
                      <scene.icon className="w-5 h-5 text-blush" />
                    </div>
                    <span className="text-xs font-medium text-warm-brown/40 font-display tracking-wider">
                      {scene.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-warm-brown font-semibold mb-3 leading-snug">
                    {scene.title}
                  </h3>
                  <p className="text-sm text-warm-brown/55 leading-relaxed">
                    {scene.body}
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
