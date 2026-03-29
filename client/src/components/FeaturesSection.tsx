/**
 * Features Section - 顧客カルテ機能 & 経営ダッシュボード
 * Two-column layout with feature details
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardList,
  BarChart3,
  MessageCircle,
  Users,
  CalendarCheck,
  TrendingUp,
  Heart,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "顧客カルテ機能",
    subtitle: "会話履歴やニーズがよく分かる",
    icon: ClipboardList,
    color: "sage",
    items: [
      { icon: Users, text: "顧客情報の一覧をひと目で確認" },
      { icon: MessageCircle, text: "会話からニーズを自動で整理" },
      { icon: Heart, text: "次のアクションをAIが提案" },
    ],
    description:
      "お客様との会話はすべて自動で記録。興味レベルや悩み、過去のやり取りがカルテにまとまるから、一人ひとりに合った対応ができます。",
  },
  {
    title: "経営ダッシュボード",
    subtitle: "予約状況や売上の流れがひと目で分かる",
    icon: BarChart3,
    color: "blush",
    items: [
      { icon: CalendarCheck, text: "予約状況をリアルタイムで一覧" },
      { icon: Users, text: "顧客数・入金額をかんたん把握" },
      { icon: TrendingUp, text: "売上の自動集計で経営を可視化" },
    ],
    description:
      "予約の入り具合、売上の推移、顧客の動きがダッシュボードに集約。数字が苦手でも、直感的に経営状況が分かります。",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isSage = feature.color === "sage";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className="group"
    >
      <div
        className={`relative rounded-2xl border p-6 sm:p-8 h-full transition-all duration-300 hover:-translate-y-1 ${
          isSage
            ? "bg-gradient-to-br from-white to-sage-light/20 border-sage/20 hover:shadow-lg hover:shadow-sage/10"
            : "bg-gradient-to-br from-white to-blush-light/30 border-blush/20 hover:shadow-lg hover:shadow-blush/10"
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isSage ? "bg-sage/15" : "bg-blush/15"
            }`}
          >
            <feature.icon
              className={`w-6 h-6 ${isSage ? "text-sage-dark" : "text-blush"}`}
            />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-warm-brown font-semibold">
              {feature.title}
            </h3>
            <p
              className={`text-sm mt-0.5 ${
                isSage ? "text-sage-dark/70" : "text-blush/80"
              }`}
            >
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-warm-brown/60 leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Feature items */}
        <div className="space-y-3">
          {feature.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSage ? "bg-sage/10" : "bg-blush/10"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isSage ? "text-sage-dark" : "text-blush"
                  }`}
                />
              </div>
              <span className="text-sm text-warm-brown/70">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blush/5 rounded-full blur-3xl" />
      </div>

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
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sage/40" />
            <span className="text-sage text-lg">🍀</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sage/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-brown mb-3">
            あなたの仕事を、もっとラクに
          </h2>
          <p className="text-sm sm:text-base text-warm-brown/50 font-display max-w-md mx-auto">
            面倒な管理業務はLaiFにおまかせ。
            <br />
            本当に大切なことに集中できます。
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
