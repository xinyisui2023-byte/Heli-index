import Link from "next/link";

const roles = [
  {
    id: "investor",
    name: "C端投资者",
    desc: "投票、提问、收集成就、预约路演",
    color: "border-blue-300 bg-blue-50",
  },
  {
    id: "pro",
    name: "专业投资者",
    desc: "券商分析师、基金研究员、投资顾问",
    color: "border-purple-300 bg-purple-50",
    verify: "需上传从业资质或名片认证",
  },
  {
    id: "academic",
    name: "产学研机构",
    desc: "高校、研究院、产业智库",
    color: "border-green-300 bg-green-50",
    verify: "需机构邮箱认证",
  },
  {
    id: "company",
    name: "上市公司（B端）",
    desc: "IR/董秘，认领公司、回复提问",
    color: "border-consensus-gold/30 bg-consensus-gold/5",
    verify: "需邮箱域名与企业一致，提交认领",
  },
];

export default function RegisterPage({ searchParams }: { searchParams?: { role?: string } }) {
  const preselectedRole = searchParams?.role;

  return (
    <main>
      <section className="py-16 px-4 bg-deep-blue text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">加入合力指数</h1>
        <p className="text-consensus-gold/80">选择您的角色，开启共识之旅</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-8 text-center">选择角色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`rounded-2xl p-6 border-2 cursor-pointer transition hover:shadow-md ${
                  preselectedRole === role.id
                    ? "border-consensus-gold bg-consensus-gold/5"
                    : "border-border bg-white"
                }`}
              >
                <h3 className="font-bold text-deep-blue mb-1">{role.name}</h3>
                <p className="text-sm text-text-secondary mb-2">{role.desc}</p>
                {role.verify && (
                  <p className="text-xs text-consensus-gold">📌 {role.verify}</p>
                )}
              </div>
            ))}
          </div>

          {/* 注册表单 Demo */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-border max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">注册账号</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">手机号 / 邮箱</label>
                <input
                  type="text"
                  placeholder="请输入手机号或邮箱"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-consensus-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">密码</label>
                <input
                  type="password"
                  placeholder="至少8位"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-consensus-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">角色</label>
                <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-consensus-gold">
                  <option value="">请选择角色</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-deep-blue text-white py-3 rounded-xl font-bold hover:bg-deep-blue-light transition"
              >
                注册
              </button>
            </form>
            <p className="text-center text-sm text-text-secondary mt-6">
              已有账号？<Link href="/login" className="text-consensus-gold font-semibold">登录 →</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
