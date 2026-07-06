import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <section className="py-16 px-4 bg-deep-blue text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">登录合力指数</h1>
        <p className="text-consensus-gold/80">欢迎回来，共识参与者</p>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 border border-border">
          <h2 className="text-xl font-bold mb-6 text-center">账号登录</h2>
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
                placeholder="请输入密码"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-consensus-gold"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                记住我
              </label>
              <a href="#" className="text-consensus-gold hover:underline">忘记密码？</a>
            </div>
            <button
              type="submit"
              className="w-full bg-deep-blue text-white py-3 rounded-xl font-bold hover:bg-deep-blue-light transition"
            >
              登录
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-text-secondary">
            还没有账号？<Link href="/register" className="text-consensus-gold font-semibold">立即注册 →</Link>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-text-light text-center mb-4">其他登录方式（Demo）</p>
            <div className="grid grid-cols-3 gap-3">
              <button className="border border-border rounded-xl py-2 text-sm hover:bg-bg-light transition">
                📱 微信
              </button>
              <button className="border border-border rounded-xl py-2 text-sm hover:bg-bg-light transition">
                📧 邮箱验证码
              </button>
              <button className="border border-border rounded-xl py-2 text-sm hover:bg-bg-light transition">
                🔐 机构SSO
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
