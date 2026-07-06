import Link from "next/link";

const roadshows = [
  {
    city: "香港",
    date: "2026年9月",
    venue: "香港金融中心",
    status: "upcoming",
    desc: "亚洲首发站，聚焦生物医药与数字经济",
  },
  {
    city: "新加坡",
    date: "2026年11月",
    venue: "滨海湾金沙",
    status: "upcoming",
    desc: "东南亚资本对接，绿色能源专题",
  },
  {
    city: "伦敦",
    date: "2026年12月",
    venue: "伦敦金融城",
    status: "upcoming",
    desc: "欧洲站，先进制造与AI专场",
  },
  {
    city: "纽约",
    date: "2027年1月",
    venue: "纳斯达克MarketSite",
    status: "upcoming",
    desc: "北美站，中概股新质生产力路演",
  },
  {
    city: "达沃斯",
    date: "2027年1月",
    venue: "世界经济论坛边会",
    status: "upcoming",
    desc: "年度盛典，与金鲲鹏颁奖同期揭晓",
    highlight: true,
  },
];

export default function RoadshowPage() {
  return (
    <main>
      <section className="relative py-24 px-4 bg-deep-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            全球巡回路演
          </h1>
          <p className="text-consensus-gold text-lg mb-2">Global Roadshow 2026-2027</p>
          <p className="text-white/70 max-w-2xl mx-auto">
            为上市公司搭建国际投资者对接舞台，覆盖五大城市，连接全球资本与新质生产力。
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">路演日程</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {roadshows.map((rs) => (
              <div
                key={rs.city}
                className={`rounded-2xl p-6 border transition hover:shadow-lg ${
                  rs.highlight
                    ? "bg-consensus-gold/10 border-consensus-gold shadow-md"
                    : "bg-white border-border"
                }`}
              >
                {rs.highlight && (
                  <span className="inline-block bg-consensus-gold text-deep-blue text-xs font-bold px-3 py-1 rounded-full mb-3">
                    年度盛典
                  </span>
                )}
                <h3 className="text-xl font-bold text-deep-blue mb-2">{rs.city}</h3>
                <p className="text-sm text-text-secondary mb-1">📅 {rs.date}</p>
                <p className="text-sm text-text-secondary mb-3">📍 {rs.venue}</p>
                <p className="text-sm text-text-secondary mb-4">{rs.desc}</p>
                <Link
                  href="#register"
                  className="text-consensus-gold text-sm font-semibold hover:underline"
                >
                  申请参会 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">往期路演回顾</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { city: "深圳", date: "2026年3月", companies: 12, investors: 80 },
              { city: "上海", date: "2026年5月", companies: 18, investors: 120 },
              { city: "北京", date: "2026年7月", companies: 15, investors: 95 },
            ].map((r) => (
              <div key={r.city} className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <h4 className="font-bold text-deep-blue mb-2">{r.city}站</h4>
                <p className="text-sm text-text-secondary mb-3">{r.date}</p>
                <div className="flex gap-4 text-sm text-text-secondary">
                  <span>{r.companies}家企业</span>
                  <span>{r.investors}位投资者</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="py-20 px-4 bg-deep-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">参与路演</h2>
          <p className="text-white/70 mb-10">
            上市公司可申请报名参与路演，投资者可申请参会席位
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register?role=company"
              className="bg-consensus-gold text-deep-blue px-8 py-3 rounded-full font-bold hover:bg-consensus-gold-light transition"
            >
              上市公司报名
            </Link>
            <Link
              href="/register?role=investor"
              className="border-2 border-consensus-gold text-consensus-gold px-8 py-3 rounded-full font-bold hover:bg-consensus-gold/10 transition"
            >
              投资者申请参会
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
