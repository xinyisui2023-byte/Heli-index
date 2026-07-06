import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero区 */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-deep-blue">
        {/* 粒子背景 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-consensus-gold rounded-full opacity-60 animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            合力指数
            <span className="block text-consensus-gold font-serif mt-2">
              Heli-Index
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-2">
            新质生产力的资本市场共识平台
          </p>
          <p className="text-sm text-consensus-gold/80 mb-10">
            《香港商报》旗下 · 连接上市公司、投资者、专业机构与学研界
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/index"
              className="bg-consensus-gold text-deep-blue px-8 py-3 rounded-full font-bold hover:bg-consensus-gold-light transition"
            >
              查看指数
            </Link>
            <Link
              href="/awards"
              className="border-2 border-consensus-gold text-consensus-gold px-8 py-3 rounded-full font-bold hover:bg-consensus-gold/10 transition"
            >
              金鲲鹏颁奖
            </Link>
            <Link
              href="/roadshow"
              className="border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition"
            >
              全球路演
            </Link>
          </div>
        </div>

        {/* AI Agent 悬浮图标 */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="w-14 h-14 rounded-full bg-consensus-gold text-deep-blue font-bold shadow-lg hover:scale-110 transition flex items-center justify-center animate-glow"
            title="AI Agent 助手"
          >
            AI
          </button>
        </div>
      </section>

      {/* 指数概览 */}
      <section className="py-20 px-4 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">实时指数概览</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <IndexCard
              name="合力300指数"
              value={3842.56}
              change={+1.23}
              desc="覆盖A股300家新质生产力代表企业"
            />
            <IndexCard
              name="合力港股通"
              value={5126.78}
              change={-0.45}
              desc="港股通范围内新质生产力企业共识值"
            />
            <IndexCard
              name="合力纳斯达克"
              value={2845.32}
              change={+2.10}
              desc="中概股及全球新质生产力共识指数"
            />
          </div>
        </div>
      </section>

      {/* 新质生产力解读 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">什么是新质生产力？</h2>
          <p className="text-text-secondary max-w-3xl mx-auto mb-10 text-lg">
            新质生产力是以科技创新为主导的生产力质态跃迁，涵盖人工智能、生物医药、
            先进制造、绿色能源、数字经济等前沿领域。合力指数追踪这些领域在资本市场的真实共识。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {["AI与大模型", "生物医药", "先进制造", "绿色能源", "数字经济"].map((tag) => (
              <span key={tag} className="bg-deep-blue/5 text-deep-blue px-4 py-2 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 路演/颁奖入口 */}
      <section className="py-20 px-4 bg-deep-blue text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">全球巡回路演</h2>
            <p className="text-white/70 mb-6">
              为上市公司搭建国际投资者对接舞台，2026-2027年覆盖香港、新加坡、伦敦、纽约、达沃斯五大城市。
            </p>
            <Link href="/roadshow" className="bg-consensus-gold text-deep-blue px-6 py-3 rounded-full font-bold inline-block hover:bg-consensus-gold-light transition">
              查看路演日程 →
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-consensus-gold">金鲲鹏颁奖典礼</h2>
            <p className="text-white/70 mb-6">
              2027年1月达沃斯，全球直播。致敬新质生产力领域的真实价值创造者。提名征集已开启。
            </p>
            <Link href="/awards" className="border-2 border-consensus-gold text-consensus-gold px-6 py-3 rounded-full font-bold inline-block hover:bg-consensus-gold/10 transition">
              查看奖项及提名 →
            </Link>
          </div>
        </div>
      </section>

      {/* 成就体系入口 */}
      <section className="py-20 px-4 bg-gold-gradient bg-opacity-5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">成就体系</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            在Web3共识层上铸造的不可转让NFT徽章，见证您在合力生态中的每一份贡献。
          </p>
          <Link href="/profile/demo" className="bg-deep-blue text-white px-8 py-3 rounded-full font-bold inline-block hover:bg-deep-blue-light transition">
            查看成就墙示例 →
          </Link>
        </div>
      </section>
    </main>
  );
}

function IndexCard({
  name,
  value,
  change,
  desc,
}: {
  name: string;
  value: number;
  change: number;
  desc: string;
}) {
  const isUp = change >= 0;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition">
      <h3 className="font-semibold text-text-primary mb-2">{name}</h3>
      <div className="text-3xl font-bold text-deep-blue mb-1">
        {value.toLocaleString()}
      </div>
      <div className={`text-sm font-semibold ${isUp ? "text-red-500" : "text-green-500"}`}>
        {isUp ? "▲" : "▼"} {Math.abs(change)}%
      </div>
      <p className="text-text-light text-sm mt-3">{desc}</p>
    </div>
  );
}
