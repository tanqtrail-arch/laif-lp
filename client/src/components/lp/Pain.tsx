/**
 * 悩みセクション — 5つのペインポイント
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquareMore,
  CalendarX2,
  FolderSearch,
  Calculator,
  Clock,
} from "lucide-react";

const pains = [
  {
    icon: MessageSquareMore,
    text: "LINE返信が追いつかない",
    sub: "気づけば未読20件。お客様を待たせてしまう罪悪感",
  },
  {
    icon: CalendarX2,
    text: "予約がダブルブッキング",
    sub: "ノートとLINEの管理がバラバラで、ミスが起きてしまう",
  },
  {
    icon: FolderSearch,
    text: "顧客情報がどこにあるか分からない",
    sub: "前回の施術内容、メモしたはずなのに見つからない",
  },
  {
    icon: Calculator,
    text: "売上管理がざっくりすぎる",
    sub: "月末になって「あれ、今月どうだったっけ？」",
  },
  {
    icon: Clock,
    text: "自分の時間がない",
    sub: "仕事と家庭を行き来して、気づけば一日が終わっている",
  },
];

export default function Pain() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-white pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blush/40" />
            <span className="text-blush/60 text-base">...</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blush/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-3 leading-relaxed">
            ひとりで抱えていませんか？
          </h2>
          <p className="text-sm sm:text-base text-warm-brown/50 font-display">
            頑張っているのに、うまく回らない。それ、あなたのせいじゃありません。
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-brown/8 p-5 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blush-light/50 flex items-center justify-center shrink-0 mt-0.5">
                <pain.icon className="w-5 h-5 text-blush" />
              </div>
              <div>
                <p className="text-base font-medium text-warm-brown mb-1">
                  {pain.text}
                </p>
                <p className="text-sm text-warm-brown/45 leading-relaxed">
                  {pain.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
