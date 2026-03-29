/**
 * Footer - LaiF LP
 * Minimal footer with brand identity
 */

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663286960690/BaPS45vqLYYkA5NeGbT5G8/laif-logo-transparent_61833de3.png";

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 border-t border-sage-light/30">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <img
            src={LOGO}
            alt="LaiF"
            className="w-28 sm:w-32 opacity-70"

          />

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-warm-brown/40 font-display text-center">
            AIで、愛のある時間を取り戻す
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-warm-brown/40">
            <a href="#" className="hover:text-sage transition-colors duration-200">
              利用規約
            </a>
            <a href="#" className="hover:text-sage transition-colors duration-200">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-sage transition-colors duration-200">
              特定商取引法に基づく表記
            </a>
            <a href="#" className="hover:text-sage transition-colors duration-200">
              お問い合わせ
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-warm-brown/30">
            © 2026 LaiF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
