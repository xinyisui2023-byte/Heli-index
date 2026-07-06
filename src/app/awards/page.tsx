import awardsData from "@/mock/awards.json";
import Link from "next/link";

export const metadata = {
  title: "金鲲鹏颁奖典礼 - 合力指数",
};

const tierColors: Record<string, string> = {
  nominating: "bg-yellow-100 text-yellow-800 border-2 border-yellow-400",
  preping: "bg-blue-100 text-blue-800 border-2 border-blue-300",
};

export default function AwardsPage() {
  const { mainAward, specialAwards, process, benfits, partners, achievementLink } =
    awardsData;

  return (
    <main>
      {/* Hero区 */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-deep-blue">
        {/* 金色粒子背景 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-consensus-gold/30"
              style={{
                width: `${4 + (i % 4) * 2}px`,
                height: `${4 + (i % 4) * 2}px`,
                left: `${((i * 37) % 100)}%`,
                top: `${((i * 53) % 100)}%`,
                animation: `particle-float ${8 + (i % 5)}s linear ${i * 0.3}s infinite`,
              }}
            />
          ))}
          {/* 光效流动 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-consensus-gold/5 to-transparent animate-shimmer" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            金鲲鹏奖
          </h1>
          <p className="text-xl text-consensus-gold mb-2 font-serif">
            新质生产力的荣耀时刻
          </p>
          <p className="text-sm text-white/60 mb-10 max-w-2xl mx-auto">
            《香港商报》与合力指数联合颁发，致敬资本市场的真实价值创造者
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#nominate"
              className="bg-consensus-gold text-deep-blue px-8 py-3 rounded-full font-bold hover:bg-consensus-gold-light transition"
            >
              提名申报
            </Link>
            <Link
              href="#register"
              className="border-2 border-consensus-gold text-consensus-gold px-8 py-3 rounded-full font-bold hover:bg-consensus-gold/10 transition"
            >
              典礼参与申请
            </Link>
          </div>
        </div>
      </section>

      {/* 主要颁奖活动卡片 */}
      <section className="py-20 px-4 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">颁奖系列活动</h2>

          {/* 主颁奖礼 */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-2 border-consensus-gold/50">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-consensus-gold text-deep-blue text-xs font-bold px-3 py-1 rounded-full">
                年度旗舰
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                🟡 {mainAward.statusLabel}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4 font-serif">
              {mainAward.name}
            </h3>
            <div className="flex flex-wrap gap-6 mb-6 text-text-secondary">
              <span>📅 {mainAward.date}</span>
              <span>📍 {mainAward.location}</span>
              {mainAward.livestream && <span>📺 全球直播</span>}
            </div>
            <p className="text-text-secondary mb-6">{mainAward.description}</p>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">奖项设置</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mainAward.categories.map((cat: string) => (
                  <li key={cat} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-consensus-gold mt-0.5">◆</span>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-light rounded-2xl p-4 mb-6">
              <p className="text-sm text-text-secondary">
                <span className="font-semibold">评选依据：</span>
                {mainAward.evaluationMethod}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#nominate"
                className="bg-deep-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-deep-blue-light transition"
              >
                提名公司/个人
              </Link>
              <Link
                href="#register"
                className="border border-deep-blue text-deep-blue px-6 py-3 rounded-full font-semibold hover:bg-deep-blue/5 transition"
              >
                申请参会
              </Link>
            </div>
          </div>

          {/* 专项颁奖礼 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialAwards.map((award: any) => (
              <div key={award.name} className="bg-white rounded-2xl shadow-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                    专项
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                    🟡 {award.statusLabel}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-deep-blue mb-3">{award.name}</h4>
                <div className="flex flex-wrap gap-4 mb-3 text-sm text-text-secondary">
                  <span>📅 {award.date}</span>
                  <span>📍 {award.location}</span>
                </div>
                <p className="text-text-secondary text-sm mb-4">{award.description}</p>
                <div>
                  <h5 className="text-sm font-semibold mb-2">奖项类别</h5>
                  <div className="flex flex-wrap gap-2">
                    {award.categories.map((cat: string) => (
                      <span key={cat} className="bg-bg-light text-text-secondary text-xs px-3 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 评选流程 */}
      <section className="py-20 px-4 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">评选流程</h2>
          <p className="text-text-secondary text-center mb-12">透明、公正、基于真实数据</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step: any) => (
              <div key={step.step} className="relative text-center">
                {step.step < 5 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-consensus-gold/30" />
                )}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-deep-blue text-white font-bold text-xl flex items-center justify-center">
                  {step.step}
                </div>
                <h4 className="font-bold text-deep-blue mb-2">{step.title}</h4>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-consensus-gold/10 rounded-2xl p-6 text-center">
            <p className="text-sm text-text-secondary">
              ⚡ <strong>共识机制：</strong>部分奖项由C端投资者投票直接产生，评选标准完全公开。
            </p>
          </div>
        </div>
      </section>

      {/* 获奖权益 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">获奖权益</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benfits.map((b: any) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-border text-center hover:shadow-md transition">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h4 className="font-bold text-deep-blue mb-2">{b.title}</h4>
                <p className="text-sm text-text-secondary">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 成就联动说明 */}
      <section className="py-16 px-4 bg-deep-blue/5">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">与成就体系的联动</h3>
          <p className="text-text-secondary mb-4">
            {achievementLink}
          </p>
          <Link href="/profile/demo" className="text-consensus-gold font-semibold hover:underline">
            查看成就体系说明 →
          </Link>
        </div>
      </section>

      {/* 合作伙伴 */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-8">媒体与合作伙伴</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {partners.map((p: string) => (
              <div key={p} className="text-text-light font-semibold text-lg grayscale hover:grayscale-0 transition">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section id="nominate" className="py-20 px-4 bg-deep-blue text-white">
        <div id="register" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">加入金鲲鹏</h2>
          <p className="text-white/70 mb-10">
            提名卓越企业/个人，或申请参加2027年达沃斯年度颁奖典礼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-consensus-gold text-deep-blue px-8 py-3 rounded-full font-bold hover:bg-consensus-gold-light transition">
              立即提名申报
            </button>
            <button className="border-2 border-consensus-gold text-consensus-gold px-8 py-3 rounded-full font-bold hover:bg-consensus-gold/10 transition">
              申请参会席位
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
