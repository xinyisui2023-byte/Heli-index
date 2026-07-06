import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "合力指数（Heli-Index）| 新质生产力的资本市场共识平台",
  description:
    "合力指数是《香港商报》旗下，连接上市公司、投资者、专业机构与学研界的多方共识平台。追踪新质生产力在资本市场的真实共识。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=Playfair+Display:wght@400;600;700&family=Noto+Serif+SC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-deep-blue/95 backdrop-blur text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-consensus-gold">⬡</span>
          <span>合力指数</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-consensus-gold transition">首页</Link>
          <Link href="/index" className="hover:text-consensus-gold transition">指数详情</Link>
          <Link href="/roadshow" className="hover:text-consensus-gold transition">全球路演</Link>
          <Link href="/awards" className="hover:text-consensus-gold transition">金鲲鹏颁奖</Link>
          <Link href="/profile/demo" className="hover:text-consensus-gold transition">成就体系</Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="hover:text-consensus-gold transition">登录</Link>
          <Link
            href="/register"
            className="bg-consensus-gold text-deep-blue px-4 py-1.5 rounded-full font-semibold hover:bg-consensus-gold-light transition"
          >
            注册
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-blue text-white/70 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-white mb-3">
            <span className="text-consensus-gold">⬡</span> 合力指数
          </div>
          <p className="text-sm">新质生产力的资本市场共识平台</p>
          <p className="text-xs mt-2">《香港商报》旗下</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">平台</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/index" className="hover:text-consensus-gold">指数详情</Link></li>
            <li><Link href="/roadshow" className="hover:text-consensus-gold">全球路演</Link></li>
            <li><Link href="/awards" className="hover:text-consensus-gold">金鲲鹏颁奖</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">社区</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/register" className="hover:text-consensus-gold">注册加入</Link></li>
            <li><Link href="/profile/demo" className="hover:text-consensus-gold">成就体系</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">联系</h4>
          <p className="text-sm">contact@heli-index.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-xs text-center">
        © 2026 合力指数 Heli-Index. All rights reserved.
      </div>
    </footer>
  );
}
