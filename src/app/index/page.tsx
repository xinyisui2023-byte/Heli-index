import Link from "next/link";

const indices = [
  {
    id: "heli-300",
    name: "合力300指数",
    nameEn: "Heli 300 Index",
    value: 3842.56,
    change: 1.23,
    desc: "覆盖A股300家新质生产力代表企业，每季度调整成分股",
    components: 300,
    industries: ["AI与大模型", "生物医药", "先进制造", "绿色能源", "数字经济"],
  },
  {
    id: "heli-hk",
    name: "合力港股通",
    nameEn: "Heli HK Connect",
    value: 5126.78,
    change: -0.45,
    desc: "港股通范围内新质生产力企业共识值，反映南向资金偏好",
    components: 120,
    industries: ["生物医药", "先进制造", "数字经济"],
  },
  {
    id: "heli-nasdaq",
    name: "合力纳斯达克",
    nameEn: "Heli Nasdaq Index",
    value: 2845.32,
    change: 2.1,
    desc: "中概股及全球新质生产力共识指数，追踪海外上市中国企业",
    components: 85,
    industries: ["AI与大模型", "数字经济", "生物医药"],
  },
];

export default function IndexPage() {
  return (
    <main>
      <section className="py-16 px-4 bg-deep-blue text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">指数详情</h1>
        <p className="text-consensus-gold/80">追踪新质生产力在资本市场的真实共识</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          {indices.map((idx) => (
            <div key={idx.id} className="bg-white rounded-3xl shadow-lg border border-border overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-deep-blue">{idx.name}</h2>
                    <p className="text-sm text-text-light">{idx.nameEn}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-deep-blue">{idx.value.toLocaleString()}</div>
                    <div className={`text-sm font-semibold ${idx.change >= 0 ? "text-red-500" : "text-green-500"}`}>
                      {idx.change >= 0 ? "▲" : "▼"} {Math.abs(idx.change)}%
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary mb-6">{idx.desc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-bg-light rounded-2xl p-4">
                    <h4 className="text-sm font-semibold mb-2 text-text-secondary">成分股数量</h4>
                    <p className="text-2xl font-bold text-deep-blue">{idx.components}</p>
                  </div>
                  <div className="bg-bg-light rounded-2xl p-4">
                    <h4 className="text-sm font-semibold mb-2 text-text-secondary">覆盖行业</h4>
                    <div className="flex flex-wrap gap-2">
                      {idx.industries.map((ind) => (
                        <span key={ind} className="bg-consensus-gold/10 text-consensus-gold text-xs px-3 py-1 rounded-full">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/index/${idx.id}`}
                    className="bg-deep-blue text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-deep-blue-light transition"
                  >
                    查看详情
                  </Link>
                  <button className="border border-border px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-bg-light transition">
                    📊 下载报告
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-bg-light">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">热力值排名（Demo Top 5）</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            {[
              { rank: 1, name: "宁德时代", heat: 9642, industry: "绿色能源" },
              { rank: 2, name: "比亚迪", heat: 9520, industry: "先进制造" },
              { rank: 3, name: "华为技术", heat: 9485, industry: "AI与大模型" },
              { rank: 4, name: "药明康德", heat: 9340, industry: "生物医药" },
              { rank: 5, name: "腾讯控股", heat: 9280, industry: "数字经济" },
            ].map((c) => (
              <div key={c.rank} className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-b-0 hover:bg-bg-light transition">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  c.rank === 1 ? "bg-consensus-gold text-deep-blue" :
                  c.rank === 2 ? "bg-gray-300 text-gray-700" :
                  c.rank === 3 ? "bg-amber-600 text-white" :
                  "bg-bg-light text-text-secondary"
                }`}>
                  {c.rank}
                </span>
                <div className="flex-1 text-left">
                  <span className="font-semibold text-deep-blue">{c.name}</span>
                  <span className="text-xs text-text-light ml-2">{c.industry}</span>
                </div>
                <div className="font-bold text-consensus-gold">{c.heat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
