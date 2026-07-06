import achievementsData from "@/mock/achievements.json";

const tierStyles: Record<string, { bg: string; border: string; label: string }> = {
  common: { bg: "bg-gray-100", border: "border-gray-300", label: "基础" },
  uncommon: { bg: "bg-blue-50", border: "border-blue-300", label: "进阶" },
  rare: { bg: "bg-purple-50", border: "border-purple-300", label: "稀有" },
  epic: { bg: "bg-yellow-50", border: "border-yellow-400", label: "史诗" },
  legendary: { bg: "bg-red-50", border: "border-red-400", label: "传说" },
};

export default function ProfilePage() {
  const { cEndInvestor, bEndCompany, proInvestor } = achievementsData;

  return (
    <main>
      <section className="py-12 px-4 bg-deep-blue text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">用户成就墙 Demo</h1>
          <p className="text-consensus-gold/80">展示C端、B端、专业投资者三类成就勋章</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <AchievementSection
            title="C端投资者 · 共识参与者"
            desc="投票、提问、签到、质押——记录每一位共识参与者的贡献"
            achievements={cEndInvestor}
          />
          <AchievementSection
            title="B端上市公司 · 价值披露先锋"
            desc="认领公司、回复提问、参与诊断——彰显企业透明度与共识度"
            achievements={bEndCompany}
          />
          <AchievementSection
            title="专业投资者 · 洞察领航者"
            desc="深度分析、共识捕手、跨行业视野——表彰专业投资者的洞察力"
            achievements={proInvestor}
          />
        </div>
      </section>

      <section className="py-16 px-4 bg-bg-light">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Web3 共识层</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            所有成就勋章均在 Web3 共识层上铸造为不可转让的 NFT 徽章，
            永久记录在链上，不可篡改，真实可验证。每个勋章包含获得日期与链上哈希。
          </p>
        </div>
      </section>
    </main>
  );
}

function AchievementSection({
  title,
  desc,
  achievements,
}: {
  title: string;
  desc: string;
  achievements: any[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-deep-blue mb-2">{title}</h2>
      <p className="text-text-secondary mb-8">{desc}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {achievements.map((a) => {
          const style = tierStyles[a.tier] || tierStyles.common;
          return (
            <div
              key={a.id}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition hover:scale-105 cursor-pointer ${
                a.unlocked ? `${style.bg} ${style.border}` : "bg-gray-50 border-gray-200 opacity-60"
              }`}
              title={`${a.name}: ${a.description}`}
            >
              {/* 六边形勋章 */}
              <div
                className={`w-16 h-16 flex items-center justify-center text-2xl ${
                  a.unlocked ? "" : "grayscale"
                }`}
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: a.unlocked
                    ? a.tier === "epic"
                      ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                      : a.tier === "legendary"
                      ? "linear-gradient(135deg, #ef4444, #f59e0b)"
                      : a.tier === "rare"
                      ? "linear-gradient(135deg, #8b5cf6, #a78bfa)"
                      : a.tier === "uncommon"
                      ? "linear-gradient(135deg, #3b82f6, #60a5fa)"
                      : "linear-gradient(135deg, #9ca3af, #d1d5db)"
                    : "#e5e7eb",
                }}
              >
                {a.unlocked ? a.icon : "?"}
              </div>
              <span className={`text-xs font-semibold text-center ${a.unlocked ? "text-deep-blue" : "text-gray-400"}`}>
                {a.name}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${style.bg} ${style.border} border`}>
                {style.label}
              </span>
              {a.unlocked && a.unlockDate && (
                <span className="text-xs text-text-light">{a.unlockDate}</span>
              )}
              {!a.unlocked && (
                <span className="text-xs text-gray-400">未解锁</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
