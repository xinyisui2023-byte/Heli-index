/* ===== 合力生态 Partner 后台系统 — SPA 引擎 ===== */
/* 路由 + 模拟数据 + 页面渲染 + 交互 */

(function() {
'use strict';

// ========== 模拟数据 ==========
const mockData = {
  businesses: [
    {
      id: 'act-1', type: 'activity', typeLabel: '活动赞助',
      client: '某AI算力公司', contractAmount: '¥500,000',
      ratio: '18%', commission: '¥90,000', status: '已回款', statusClass: 'status-completed',
      detail: {
        activityName: '2026全球AI算力峰会',
        time: '2026-09-20', location: '上海·国际会议中心',
        sponsor: '某AI算力科技（上海）有限公司', contact: '王经理 138-0000-0001',
        contractAmount: '¥500,000', ratio: '18%', commission: '¥90,000',
        payments: [
          { node: '签约款', shouldBe: '¥250,000', actual: '¥250,000', date: '2026-09-15', commission: '¥45,000', status: '已结算', statusClass: 'status-completed' },
          { node: '尾款', shouldBe: '¥250,000', actual: '—', date: '待回款', commission: '¥45,000', status: '待结算', statusClass: 'status-pending' },
        ],
        commissionStatus: '首笔已结算 / 尾款待回款后结算',
      }
    },
    {
      id: 'fa-1', type: 'fa', typeLabel: 'FA业务',
      client: '某机器人项目', contractAmount: '交易额2,000万',
      ratio: '1.5%', commission: '¥300,000', status: '首付款已到账', statusClass: 'status-partial',
      detail: {
        projectName: '某智能机器人A轮融资', track: '智能制造/机器人',
        buyer: '某产业基金', seller: '某机器人科技有限公司',
        totalAmount: '¥20,000,000', agreementType: '独家FA',
        ratio: '1.5%', commission: '¥300,000',
        payments: [
          { node: '首付款', amount: '¥10,000,000', date: '2026-10-20', commission: '¥150,000', status: '已结算', statusClass: 'status-completed' },
          { node: '尾款', amount: '¥10,000,000', date: '待支付', commission: '¥150,000', status: '待结算', statusClass: 'status-pending' },
        ],
      }
    },
    {
      id: 'tenant-1', type: 'tenant', typeLabel: '上市公司入驻',
      client: '某科创板企业', contractAmount: '¥800,000',
      ratio: '12%', commission: '¥96,000', status: '谈判中', statusClass: 'status-negotiating',
      detail: {
        companyName: '某科创板新材料股份有限公司', stockCode: '688XXX',
        level: '高级入驻', fee: '¥800,000/年', ratio: '12%', commission: '¥96,000',
        stages: [
          { stage: '线索报备', status: '已完成', time: '2026-08-01' },
          { stage: '初次拜访', status: '已完成', time: '2026-08-15' },
          { stage: '方案提交', status: '已完成', time: '2026-09-01' },
          { stage: '合同谈判', status: '进行中', time: '—' },
          { stage: '签约回款', status: '待完成', time: '—' },
        ],
      }
    },
    {
      id: 'sub-1', type: 'subscription', typeLabel: 'SaaS订阅',
      client: '某券商研究所', contractAmount: '¥120,000/年',
      ratio: '30%', commission: '¥36,000', status: '已回款', statusClass: 'status-completed',
      detail: {
        client: '某证券股份有限公司研究所', product: '合力指数SaaS Pro版',
        fee: '¥120,000/年', shareYear: '首年', ratio: '30%', commission: '¥36,000',
        paymentStatus: '已全额回款（2026-09-05）',
        commissionStatus: '已结算（2026-10-05）',
        renewalNote: '2027-09-01起可跟进续费，续费分成比例10%',
      }
    },
    {
      id: 'spo-1', type: 'sponsor', typeLabel: '综艺赞助',
      client: '某新能源车企', contractAmount: '¥5,000,000',
      ratio: '6%', commission: '¥300,000', status: '合同签署中', statusClass: 'status-signing',
      detail: {
        showName: '《智造者》第一季', level: '特约赞助',
        totalAmount: '¥5,000,000', ratio: '6%', commission: '¥300,000',
        payments: [
          { node: '签约款', pct: '30%', amount: '¥1,500,000', status: '已到账', statusClass: 'status-completed', commission: '¥90,000' },
          { node: '开机款', pct: '40%', amount: '¥2,000,000', status: '待支付', statusClass: 'status-pending', commission: '¥120,000' },
          { node: '播出尾款', pct: '30%', amount: '¥1,500,000', status: '待支付', statusClass: 'status-pending', commission: '¥90,000' },
        ],
      }
    },
  ],

  declares: [
    {
      id: 'DEC-20261015-001', time: '2026-10-15 14:30', type: '资源对接',
      summary: '引荐某地方政府考察合力生态', points: 5000,
      auditStatus: '已确认', auditClass: 'audit-confirmed',
      chainStatus: '已上链', chainClass: 'chain-onchain',
      timeline: [
        { time: '2026-10-15 14:30', node: '提交申报', status: '✓', operator: '申报人' },
        { time: '2026-10-15 14:31', node: '系统自动分配审核委员', status: '✓', operator: '系统' },
        { time: '2026-10-16 10:00', node: '委员会初审', status: '✓', operator: '轮值委员：张XX' },
        { time: '2026-10-17 09:00', node: '委员会合议投票（4/5同意）', status: '✓', operator: '合力值治理委员会' },
        { time: '2026-10-17 12:00', node: '确认合力值：5,000', status: '✓', operator: '系统' },
        { time: '2026-10-17 18:00', node: '链上确权存证', status: '✓', operator: 'Conflux树图链' },
      ],
      letter: {
        to: '申报人', from: '合力值治理委员会', date: '2026年10月17日',
        subject: '关于DEC-20261015-001号贡献申报的确认函',
        body: '经合力值治理委员会审核与合议，确认您申报的"引荐某地方政府考察合力生态"贡献行为属实，对生态具有显著价值。根据生态稀缺性原则，确认授予合力值 5,000 分。该贡献值已记录于合力生态贡献系统，并将在本批次确权周期内上链存证。',
        vote: { agree: 4, reject: 0, abstain: 1 },
        signers: ['张XX（轮值委员）', '李XX（委员）', '王XX（委员）', '赵XX（委员）'],
      },
      chain: {
        status: '已上链', chain: 'Conflux树图链',
        contract: '0x7a9f...3b2e', time: '2026-10-17 18:05:23',
        block: '#15,823,401', hash: '0x4e8c...9d1a',
        points: 5000, coef: '×3.0', finalPoints: 15000,
      }
    },
    {
      id: 'DEC-20261020-002', time: '2026-10-20', type: '内容传播',
      summary: '发布合力指数深度解读文章于财经媒体', points: 3000,
      auditStatus: '审核中', auditClass: 'audit-pending',
      chainStatus: '待确权', chainClass: 'chain-pending',
      timeline: [
        { time: '2026-10-20 09:15', node: '提交申报', status: '✓', operator: '申报人' },
        { time: '2026-10-20 09:16', node: '系统自动分配审核委员', status: '✓', operator: '系统' },
        { time: '—', node: '委员会初审', status: '待处理', operator: '—' },
      ],
    },
    {
      id: 'DEC-20260901-003', time: '2026-09-01', type: '社群运营',
      summary: '建立并运营500人投资者社群', points: 2000,
      auditStatus: '已确认', auditClass: 'audit-confirmed',
      chainStatus: '已上链', chainClass: 'chain-onchain',
    },
    {
      id: 'DEC-20260815-004', time: '2026-08-15', type: '智力贡献',
      summary: '撰写合力指数方法论白皮书初稿', points: 8000,
      auditStatus: '已确认', auditClass: 'audit-confirmed',
      chainStatus: '已上链', chainClass: 'chain-onchain',
    },
    {
      id: 'DEC-20261010-005', time: '2026-10-10', type: '其他',
      summary: '提供合规法律咨询意见', points: 1500,
      auditStatus: '需补充材料', auditClass: 'audit-needs-material',
      chainStatus: '待确权', chainClass: 'chain-pending',
      needMaterial: '请补充提供：1）法律咨询服务的具体时间记录 2）咨询意见被采纳的证明文件 3）服务对象的确认函。',
    },
  ],

  commissions: [
    { date: '2026-10-05', source: '订阅销售', client: '某券商', gmv: '¥120,000', ratio: '30%', amount: '¥36,000', status: '已发放', statusClass: 'status-completed' },
    { date: '2026-10-20', source: 'FA业务', client: '某机器人', gmv: '¥10,000,000', ratio: '1.5%', amount: '¥150,000', status: '已发放', statusClass: 'status-completed' },
    { date: '2026-09-20', source: '活动赞助', client: '某AI公司', gmv: '¥250,000', ratio: '18%', amount: '¥45,000', status: '已发放', statusClass: 'status-completed' },
    { date: '—', source: '综艺赞助', client: '某车企', gmv: '¥5,000,000', ratio: '6%', amount: '¥300,000', status: '部分待结算', statusClass: 'status-partial' },
  ],

  dividends: {
    q3: {
      snapshot: 45200, gmvPoints: 35200, declarePoints: 10000,
      poolTotal: '¥500,000', share: '0.8%', amount: '¥4,000',
      status: '已发放', date: '2026-10-15',
    },
    q4: {
      settleDate: '2027年1月', currentPoints: 128500,
      estimate: '¥12,000-15,000', note: '实际金额以季度末合力值快照为准',
    }
  },

  options: {
    granted: 50000, totalPercent: '0.05%',
    vested: 12500, exercisePrice: '¥2.00',
    valuation: '¥8.00', paperValue: '¥100,000',
    grantDate: '2026-10-01', vestingYears: 4,
    vestedPct: 25, nextVest: '2027-01-01', nextVestAmount: 1041,
  },

  leads: [
    { time: '2026-10-01 14:30', company: '某科创板企业', type: '上市公司入驻', amount: '100-500万', status: '已转化', statusClass: 'status-completed', owner: '本人' },
    { time: '2026-09-15 09:00', company: '某新能源车企', type: '综艺赞助', amount: '500万以上', status: '跟进中', statusClass: 'status-negotiating', owner: '本人' },
    { time: '2026-08-20 16:00', company: '某医药集团', type: '活动赞助', amount: '50-100万', status: '已关闭', statusClass: 'status-pending', owner: '本人' },
  ],
};

// 合力值参考标准
const declareStandards = [
  { type: '资源对接', range: '1,000-10,000', standard: '资源成功对接并产生后续合作' },
  { type: '内容传播', range: '500-5,000', standard: '发布在权威媒体或产生显著传播效果' },
  { type: '社群运营', range: '500-3,000', standard: '持续运营≥1个月，有可验证的活跃数据' },
  { type: '智力贡献', range: '1,000-10,000', standard: '产出可被生态使用的知识产品' },
  { type: '品牌背书', range: '2,000-20,000', standard: '引入权威机构/人物为生态背书' },
  { type: '技术贡献', range: '1,000-15,000', standard: '代码被合并或技术方案被采纳' },
];

// 八大业务线分配标准
const bizStandards = [
  { title: '综艺赞助', icon: '🎬', items: [
    { label: '冠名赞助', ratio: '3%-5%', note: '节目冠名权+片头片尾植入' },
    { label: '特约赞助', ratio: '5%-8%', note: '片中口播+场景植入' },
    { label: '指定产品', ratio: '8%-12%', note: '产品露出+口播提及' },
  ]},
  { title: '上市公司入驻', icon: '🏢', items: [
    { label: '基础入驻', ratio: '8%-10%', note: '指数展示+基础数据服务' },
    { label: '高级入驻', ratio: '10%-15%', note: '深度诊断+路演优先权' },
    { label: '战略入驻', ratio: '15%-20%', note: '定制化服务+生态资源对接' },
  ]},
  { title: 'SaaS订阅销售', icon: '📊', items: [
    { label: '首年订阅', ratio: '25%-35%', note: 'Pro版/Enterprise版首年' },
    { label: '续费订阅', ratio: '8%-12%', note: '第二年起续费分成' },
    { label: '增购模块', ratio: '15%-20%', note: '额外模块购买分成' },
  ]},
  { title: 'FA业务', icon: '🤝', items: [
    { label: '独家FA', ratio: '1%-2%', note: '融资总额的分成' },
    { label: '联合FA', ratio: '0.5%-1%', note: '与其他机构联合' },
    { label: '顾问费', ratio: '固定费用', note: '按项目收取固定顾问费' },
  ]},
  { title: '融资对接', icon: '💰', items: [
    { label: '股权融资', ratio: '0.5%-1.5%', note: '成功融资额的分成' },
    { label: '债权融资', ratio: '0.3%-0.8%', note: '融资金额的分成' },
    { label: '并购对接', ratio: '0.5%-2%', note: '交易金额的分成' },
  ]},
  { title: '活动赞助', icon: '🎪', items: [
    { label: '峰会赞助', ratio: '15%-20%', note: '年度大型峰会' },
    { label: '论坛赞助', ratio: '12%-18%', note: '行业论坛/研讨会' },
    { label: '沙龙赞助', ratio: '10%-15%', note: '小型闭门沙龙' },
  ]},
  { title: '非GMV贡献申报', icon: '📝', items: [
    { label: '资源对接', ratio: '1,000-10,000', note: '资源成功对接产生后续合作' },
    { label: '内容传播', ratio: '500-5,000', note: '权威媒体发布或显著传播' },
    { label: '社群运营', ratio: '500-3,000', note: '持续运营≥1月≥200人' },
    { label: '智力贡献', ratio: '1,000-10,000', note: '被生态采用的知识产品' },
    { label: '品牌背书', ratio: '2,000-20,000', note: '引入权威机构/人物背书' },
    { label: '技术贡献', ratio: '1,000-15,000', note: '代码合并或方案采纳' },
  ]},
  { title: '申报审核与确权流程', icon: '⛓️', items: [
    { label: '提交申报', ratio: '贡献者自主', note: '通过申报页面提交' },
    { label: '系统分配', ratio: '即时', note: '自动分配2名轮值委员初审' },
    { label: '初审', ratio: '≤5个工作日', note: '委员审核材料真实性与完整性' },
    { label: '合议投票', ratio: '≤15个工作日', note: '5-7人投票≥60%同意' },
    { label: '确认回函', ratio: '24小时内', note: '系统生成确认函通知申报人' },
    { label: '合力值计入', ratio: '确认后即时', note: '合力值自动更新' },
    { label: '链上确权', ratio: '每两周批量', note: 'Conflux树图链存证' },
  ]},
];

// ========== 路由系统 ==========
const routes = [];

function addRoute(pattern, handler) {
  // Convert '/declare/:id' to regex
  const paramNames = [];
  const regexStr = '^' + pattern.replace(/:([^\/]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  }) + '$';
  routes.push({ pattern, regex: new RegExp(regexStr), paramNames, handler });
}

function navigate(path) {
  window.location.hash = '#' + path;
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || '/login';
  const app = document.getElementById('partner-app');

  for (const route of routes) {
    const match = hash.match(route.regex);
    if (match) {
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      // Check auth (except login page)
      if (hash !== '/login' && !getState().loggedIn) {
        navigate('/login');
        return;
      }
      app.innerHTML = '';
      const content = route.handler(params);
      app.innerHTML = content;
      // Scroll to top
      window.scrollTo(0, 0);
      // Run page-specific init
      if (typeof route.init === 'function') {
        route.init(params);
      }
      // Run any data-init attributes
      app.querySelectorAll('[data-init]').forEach(el => {
        const fn = el.getAttribute('data-init');
        if (typeof window[fn] === 'function') window[fn](el);
      });
      return;
    }
  }
  // 404
  app.innerHTML = '<div class="partner-content"><div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">页面不存在</div></div></div>';
}

// ========== 状态管理 ==========
function getState() {
  return JSON.parse(localStorage.getItem('partner_state') || '{"loggedIn":false,"email":""}');
}

function setState(state) {
  localStorage.setItem('partner_state', JSON.stringify(state));
}

function logout() {
  localStorage.removeItem('partner_state');
  navigate('/login');
}

// ========== Toast ==========
function showToast(msg) {
  const existing = document.querySelector('.partner-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'partner-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ========== 通用组件 ==========
function navHTML(activePath) {
  const links = [
    { path: '/dashboard', label: '贡献仪表盘' },
    { path: '/declare', label: '贡献申报' },
    { path: '/earnings', label: '收益中心' },
    { path: '/leads', label: '线索报备' },
    { path: '/rules', label: '规则中心' },
  ];
  const state = getState();
  const linksHTML = links.map(l =>
    `<span class="partner-nav-link ${activePath === l.path ? 'active' : ''}" onclick="navigate('${l.path}')">${l.label}</span>`
  ).join('');
  return `
    <div class="partner-nav">
      <div class="partner-nav-left" id="navLinks">
        <div class="partner-nav-logo">合</div>
        <span class="partner-nav-brand">Partner 后台</span>
        ${linksHTML}
      </div>
      <div class="partner-nav-right">
        <span class="partner-nav-email">${state.email || 'demo@heli.bio'}</span>
        <span class="partner-nav-logout" onclick="logout()">退出</span>
      </div>
      <div class="partner-nav-toggle" onclick="document.getElementById('navLinks').classList.toggle('open')">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
}

function footerHTML() {
  return `<div class="partner-footer">合力生态 © 2026 | Partner后台 Demo版 | 数据为模拟演示 | 链上确权由Conflux树图链提供支持</div>`;
}

function pageWrap(navActive, content) {
  return navHTML(navActive) + `<div class="partner-content page-enter">${content}</div>` + footerHTML();
}

// ========== 页面：登录 ==========
addRoute('/login', () => {
  const state = getState();
  if (state.loggedIn) {
    setTimeout(() => navigate('/dashboard'), 0);
    return '<div class="partner-login-wrap"><div class="partner-login-card">正在进入...</div></div>';
  }
  return `
    <div class="partner-login-wrap">
      <div class="partner-login-card">
        <div class="partner-login-logo">
          <div class="pll-icon">合</div>
          <span class="pll-text">合力生态</span>
        </div>
        <div class="partner-login-title">Partner 后台</div>
        <div class="partner-login-subtitle">贡献量化 · 收益透明 · 即时分配</div>
        <div class="partner-login-form">
          <input type="email" class="form-input" id="loginEmail" placeholder="请输入邮箱" value="">
          <button class="partner-login-btn" onclick="handleLogin()">进入后台</button>
        </div>
        <div class="partner-login-note">Demo 版本，数据为模拟演示</div>
      </div>
    </div>
  `;
});
// Login init
window.handleLogin = function() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('请输入合法的邮箱地址');
    return;
  }
  setState({ loggedIn: true, email: email });
  showToast('登录成功，正在进入后台...');
  setTimeout(() => navigate('/dashboard'), 800);
};
// Enter key support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('loginEmail')) {
    handleLogin();
  }
});

// ========== 页面：仪表盘 ==========
addRoute('/dashboard', () => {
  const bizRows = mockData.businesses.map(b => `
    <tr>
      <td data-label="业务类型">${b.typeLabel}</td>
      <td data-label="客户名称">${b.client}</td>
      <td data-label="合同金额">${b.contractAmount}</td>
      <td data-label="分成比例">${b.ratio}</td>
      <td data-label="预计佣金" style="color:var(--gold-dark);font-weight:700">${b.commission}</td>
      <td data-label="当前状态"><span class="status-tag ${b.statusClass}">${b.status}</span></td>
      <td data-label="操作"><span style="color:var(--gold);cursor:pointer;font-weight:700" onclick="navigate('/dashboard/${b.type}/${b.id}')">详情 →</span></td>
    </tr>
  `).join('');

  return pageWrap('/dashboard', `
    <div class="partner-page-title">📊 我的贡献仪表盘</div>
    <div class="partner-page-subtitle">GMV贡献自动追踪 · 实时更新</div>

    <div class="overview-grid">
      <div class="overview-card">
        <div class="oc-icon">💰</div>
        <div class="oc-label">累计贡献GMV</div>
        <div class="oc-value">¥2,380,000</div>
      </div>
      <div class="overview-card">
        <div class="oc-icon">💵</div>
        <div class="oc-label">累计获得佣金</div>
        <div class="oc-value gold">¥356,000</div>
      </div>
      <div class="overview-card">
        <div class="oc-icon">⭐</div>
        <div class="oc-label">当前合力积分</div>
        <div class="oc-value">128,500</div>
        <div class="oc-sub">创世期 ×3.0</div>
      </div>
      <div class="overview-card">
        <div class="oc-icon">🏆</div>
        <div class="oc-label">当前积分排名</div>
        <div class="oc-value">第 12 名</div>
        <div class="oc-sub">创世期 ×3.0 加权</div>
      </div>
    </div>

    <div class="section-title">📋 业务条线</div>
    <div class="biz-table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>业务类型</th><th>客户名称</th><th>合同金额</th>
            <th>分成比例</th><th>预计佣金</th><th>当前状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>${bizRows}</tbody>
      </table>
    </div>
  `);
});

// ========== 页面：活动业务明细 ==========
addRoute('/dashboard/activity/:id', (params) => {
  const biz = mockData.businesses.find(b => b.id === params.id && b.type === 'activity');
  if (!biz) return pageWrap('/dashboard', '<div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">未找到该业务记录</div></div>');
  const d = biz.detail;
  const payments = d.payments.map(p => `
    <tr>
      <td data-label="回款节点">${p.node}</td>
      <td data-label="应回款金额">${p.shouldBe}</td>
      <td data-label="实回款金额">${p.actual}</td>
      <td data-label="到账日期">${p.date}</td>
      <td data-label="本次佣金" style="color:var(--gold-dark);font-weight:700">${p.commission}</td>
      <td data-label="结算状态"><span class="status-tag ${p.statusClass}">${p.status}</span></td>
    </tr>
  `).join('');

  return pageWrap('/dashboard', `
    <div class="breadcrumb">
      <span class="breadcrumb-item" style="color:var(--gold);cursor:pointer" onclick="navigate('/dashboard')">贡献仪表盘</span>
      <span class="sep">/</span>
      <span>活动业务明细</span>
    </div>
    <div class="detail-header">
      <div class="dh-client">${d.activityName}</div>
      <div class="dh-type">${biz.typeLabel} · ${d.sponsor}</div>
      <div class="detail-progress"><div class="detail-progress-fill" style="width:50%"></div></div>
      <div style="font-size:11px;color:var(--text-light);margin-top:6px">回款进度：50%（1/2节点已到账）</div>
    </div>

    <div class="detail-section">
      <h3>📋 基本信息</h3>
      <div class="detail-row"><span class="dr-label">活动名称</span><span class="dr-value">${d.activityName}</span></div>
      <div class="detail-row"><span class="dr-label">活动时间</span><span class="dr-value">${d.time}</span></div>
      <div class="detail-row"><span class="dr-label">活动地点</span><span class="dr-value">${d.location}</span></div>
      <div class="detail-row"><span class="dr-label">赞助方全称</span><span class="dr-value">${d.sponsor}</span></div>
      <div class="detail-row"><span class="dr-label">联系人</span><span class="dr-value">${d.contact}</span></div>
      <div class="detail-row"><span class="dr-label">合同金额</span><span class="dr-value gold">${d.contractAmount}</span></div>
      <div class="detail-row"><span class="dr-label">分成比例</span><span class="dr-value">${d.ratio}</span></div>
      <div class="detail-row"><span class="dr-label">预计佣金</span><span class="dr-value gold">${d.commission}</span></div>
    </div>

    <div class="detail-section">
      <h3>💰 回款记录</h3>
      <div class="biz-table-wrap">
        <table class="data-table">
          <thead><tr><th>回款节点</th><th>应回款金额</th><th>实回款金额</th><th>到账日期</th><th>本次佣金</th><th>结算状态</th></tr></thead>
          <tbody>${payments}</tbody>
        </table>
      </div>
      <div style="margin-top:12px;padding:10px 14px;background:var(--gold-bg);border-radius:var(--radius-sm);font-size:12px;color:var(--gold-dark);font-weight:600">
        佣金结算状态：${d.commissionStatus}
      </div>
    </div>
  `);
});

// ========== 页面：FA业务明细 ==========
addRoute('/dashboard/fa/:id', (params) => {
  const biz = mockData.businesses.find(b => b.id === params.id && b.type === 'fa');
  if (!biz) return pageWrap('/dashboard', '<div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">未找到该业务记录</div></div>');
  const d = biz.detail;
  const payments = d.payments.map(p => `
    <tr>
      <td data-label="到账节点">${p.node}</td>
      <td data-label="到账金额">${p.amount}</td>
      <td data-label="到账日期">${p.date}</td>
      <td data-label="本次佣金" style="color:var(--gold-dark);font-weight:700">${p.commission}</td>
      <td data-label="结算状态"><span class="status-tag ${p.statusClass}">${p.status}</span></td>
    </tr>
  `).join('');

  return pageWrap('/dashboard', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/dashboard')">贡献仪表盘</span>
      <span class="sep">/</span><span>FA业务明细</span>
    </div>
    <div class="detail-header">
      <div class="dh-client">${d.projectName}</div>
      <div class="dh-type">${biz.typeLabel} · ${d.track}</div>
      <div class="detail-progress"><div class="detail-progress-fill" style="width:50%"></div></div>
      <div style="font-size:11px;color:var(--text-light);margin-top:6px">回款进度：50%（首付已到账）</div>
    </div>
    <div class="detail-section">
      <h3>📋 基本信息</h3>
      <div class="detail-row"><span class="dr-label">项目名称</span><span class="dr-value">${d.projectName}</span></div>
      <div class="detail-row"><span class="dr-label">行业赛道</span><span class="dr-value">${d.track}</span></div>
      <div class="detail-row"><span class="dr-label">买方</span><span class="dr-value">${d.buyer}</span></div>
      <div class="detail-row"><span class="dr-label">卖方</span><span class="dr-value">${d.seller}</span></div>
      <div class="detail-row"><span class="dr-label">交易总额</span><span class="dr-value gold">${d.totalAmount}</span></div>
      <div class="detail-row"><span class="dr-label">协议类型</span><span class="dr-value">${d.agreementType}</span></div>
      <div class="detail-row"><span class="dr-label">分成比例</span><span class="dr-value">${d.ratio}</span></div>
      <div class="detail-row"><span class="dr-label">预计总佣金</span><span class="dr-value gold">${d.commission}</span></div>
    </div>
    <div class="detail-section">
      <h3>💰 到账记录</h3>
      <div class="biz-table-wrap">
        <table class="data-table">
          <thead><tr><th>到账节点</th><th>到账金额</th><th>到账日期</th><th>本次佣金</th><th>结算状态</th></tr></thead>
          <tbody>${payments}</tbody>
        </table>
      </div>
    </div>
  `);
});

// ========== 页面：入驻业务明细 ==========
addRoute('/dashboard/tenant/:id', (params) => {
  const biz = mockData.businesses.find(b => b.id === params.id && b.type === 'tenant');
  if (!biz) return pageWrap('/dashboard', '<div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">未找到该业务记录</div></div>');
  const d = biz.detail;
  const stages = d.stages.map((s, i) => {
    const dotClass = s.status === '已完成' ? 'done' : (s.status === '进行中' ? 'current' : '');
    const checkIcon = s.status === '已完成' ? '✓' : (s.status === '进行中' ? '●' : '');
    return `
      <div class="timeline-item">
        <div class="timeline-dot ${dotClass}">${checkIcon}</div>
        <div class="timeline-time">${s.time}</div>
        <div class="timeline-node">${s.stage}</div>
        <div class="timeline-status">${s.status}</div>
      </div>
    `;
  }).join('');

  return pageWrap('/dashboard', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/dashboard')">贡献仪表盘</span>
      <span class="sep">/</span><span>入驻业务明细</span>
    </div>
    <div class="detail-header">
      <div class="dh-client">${d.companyName}</div>
      <div class="dh-type">${biz.typeLabel} · ${d.level} · ${d.stockCode}</div>
      <div class="detail-progress"><div class="detail-progress-fill" style="width:60%"></div></div>
      <div style="font-size:11px;color:var(--text-light);margin-top:6px">推进进度：60%（3/5阶段完成）</div>
    </div>
    <div class="detail-section">
      <h3>📋 基本信息</h3>
      <div class="detail-row"><span class="dr-label">企业全称</span><span class="dr-value">${d.companyName}</span></div>
      <div class="detail-row"><span class="dr-label">股票代码</span><span class="dr-value">${d.stockCode}</span></div>
      <div class="detail-row"><span class="dr-label">入驻级别</span><span class="dr-value">${d.level}</span></div>
      <div class="detail-row"><span class="dr-label">入驻费</span><span class="dr-value">${d.fee}</span></div>
      <div class="detail-row"><span class="dr-label">分成比例</span><span class="dr-value">${d.ratio}</span></div>
      <div class="detail-row"><span class="dr-label">预计佣金</span><span class="dr-value gold">${d.commission}</span></div>
    </div>
    <div class="detail-section">
      <h3>📍 谈判阶段记录</h3>
      <div class="timeline">${stages}</div>
    </div>
  `);
});

// ========== 页面：订阅业务明细 ==========
addRoute('/dashboard/subscription/:id', (params) => {
  const biz = mockData.businesses.find(b => b.id === params.id && b.type === 'subscription');
  if (!biz) return pageWrap('/dashboard', '<div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">未找到该业务记录</div></div>');
  const d = biz.detail;

  return pageWrap('/dashboard', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/dashboard')">贡献仪表盘</span>
      <span class="sep">/</span><span>订阅业务明细</span>
    </div>
    <div class="detail-header">
      <div class="dh-client">${d.client}</div>
      <div class="dh-type">${biz.typeLabel} · ${d.product}</div>
      <div class="detail-progress"><div class="detail-progress-fill" style="width:100%"></div></div>
      <div style="font-size:11px;color:var(--text-light);margin-top:6px">状态：已全额回款 ✅</div>
    </div>
    <div class="detail-section">
      <h3>📋 基本信息</h3>
      <div class="detail-row"><span class="dr-label">客户全称</span><span class="dr-value">${d.client}</span></div>
      <div class="detail-row"><span class="dr-label">订阅产品</span><span class="dr-value">${d.product}</span></div>
      <div class="detail-row"><span class="dr-label">订阅金额</span><span class="dr-value">${d.fee}</span></div>
      <div class="detail-row"><span class="dr-label">分成年份</span><span class="dr-value">${d.shareYear}</span></div>
      <div class="detail-row"><span class="dr-label">分成比例</span><span class="dr-value">${d.ratio}</span></div>
      <div class="detail-row"><span class="dr-label">预计佣金</span><span class="dr-value gold">${d.commission}</span></div>
    </div>
    <div class="detail-section">
      <h3>💰 结算信息</h3>
      <div class="detail-row"><span class="dr-label">回款状态</span><span class="dr-value"><span class="status-tag status-completed">${d.paymentStatus}</span></span></div>
      <div class="detail-row"><span class="dr-label">佣金结算</span><span class="dr-value"><span class="status-tag status-completed">${d.commissionStatus}</span></span></div>
    </div>
    <div class="detail-section" style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-color:#fde68a">
      <h3 style="color:#92400e">⏰ 续费提醒</h3>
      <div style="font-size:13px;color:#92400e;line-height:1.8">${d.renewalNote}</div>
    </div>
  `);
});

// ========== 页面：赞助业务明细 ==========
addRoute('/dashboard/sponsor/:id', (params) => {
  const biz = mockData.businesses.find(b => b.id === params.id && b.type === 'sponsor');
  if (!biz) return pageWrap('/dashboard', '<div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">未找到该业务记录</div></div>');
  const d = biz.detail;
  const payments = d.payments.map(p => `
    <tr>
      <td data-label="付款节点">${p.node}</td>
      <td data-label="比例">${p.pct}</td>
      <td data-label="金额">${p.amount}</td>
      <td data-label="状态"><span class="status-tag ${p.statusClass}">${p.status}</span></td>
      <td data-label="对应佣金" style="color:var(--gold-dark);font-weight:700">${p.commission}</td>
    </tr>
  `).join('');

  return pageWrap('/dashboard', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/dashboard')">贡献仪表盘</span>
      <span class="sep">/</span><span>赞助业务明细</span>
    </div>
    <div class="detail-header">
      <div class="dh-client">${d.showName}</div>
      <div class="dh-type">${biz.typeLabel} · ${d.level}</div>
      <div class="detail-progress"><div class="detail-progress-fill" style="width:33%"></div></div>
      <div style="font-size:11px;color:var(--text-light);margin-top:6px">回款进度：33%（签约款已到账）</div>
    </div>
    <div class="detail-section">
      <h3>📋 基本信息</h3>
      <div class="detail-row"><span class="dr-label">综艺名称</span><span class="dr-value">${d.showName}</span></div>
      <div class="detail-row"><span class="dr-label">赞助级别</span><span class="dr-value">${d.level}</span></div>
      <div class="detail-row"><span class="dr-label">赞助总额</span><span class="dr-value gold">${d.totalAmount}</span></div>
      <div class="detail-row"><span class="dr-label">分成比例</span><span class="dr-value">${d.ratio}</span></div>
      <div class="detail-row"><span class="dr-label">预计佣金</span><span class="dr-value gold">${d.commission}</span></div>
    </div>
    <div class="detail-section">
      <h3>💰 付款节奏与佣金结算</h3>
      <div class="biz-table-wrap">
        <table class="data-table">
          <thead><tr><th>付款节点</th><th>比例</th><th>金额</th><th>状态</th><th>对应佣金</th></tr></thead>
          <tbody>${payments}</tbody>
        </table>
      </div>
    </div>
  `);
});

// ========== 页面：贡献申报列表 ==========
addRoute('/declare', () => {
  const rows = mockData.declares.map(d => `
    <tr>
      <td data-label="申报编号" style="font-family:monospace;font-size:11px">${d.id}</td>
      <td data-label="申报时间">${d.time}</td>
      <td data-label="贡献类型">${d.type}</td>
      <td data-label="申报内容摘要">${d.summary}</td>
      <td data-label="申请合力值" style="color:var(--gold-dark);font-weight:700">${d.points.toLocaleString()}</td>
      <td data-label="审核状态"><span class="status-tag ${d.auditClass}">${d.auditStatus}</span></td>
      <td data-label="确权状态"><span class="status-tag ${d.chainClass} ${d.chainClass === 'chain-onchain' ? 'chain-icon' : ''}">${d.chainStatus}</span></td>
      <td data-label="操作"><span style="color:var(--gold);cursor:pointer;font-weight:700" onclick="navigate('/declare/${d.id}')">详情 →</span></td>
    </tr>
  `).join('');

  return pageWrap('/declare', `
    <div class="partner-page-title">📝 贡献申报</div>
    <div class="partner-page-subtitle">主动申报非GMV类贡献 · 委员会审核确认 · 链上确权</div>

    <button class="btn-primary" onclick="navigate('/declare/new')" style="margin-bottom:20px">
      ➕ 新建申报
    </button>

    <div class="biz-table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>申报编号</th><th>申报时间</th><th>贡献类型</th>
            <th>申报内容摘要</th><th>申请合力值</th><th>审核状态</th><th>确权状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `);
});

// ========== 页面：新建申报 ==========
addRoute('/declare/new', () => {
  const sidebarItems = declareStandards.map(s => `
    <div class="dfs-row">
      <div class="dfs-type">${s.type}</div>
      <div class="dfs-range">合力值 ${s.range}</div>
      <div style="color:var(--text-light)">${s.standard}</div>
    </div>
  `).join('');

  return pageWrap('/declare', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/declare')">贡献申报</span>
      <span class="sep">/</span><span>新建申报</span>
    </div>
    <div class="partner-page-title">✏️ 新建贡献申报</div>
    <div class="partner-page-subtitle">填报非GMV类贡献行为 · 提交后由合力值治理委员会审核</div>

    <div class="declare-form">
      <div class="df-grid">
        <div>
          <div class="form-group">
            <label class="form-label">贡献类型 *</label>
            <select class="form-select" id="declareType">
              <option value="">请选择贡献类型</option>
              <option value="资源对接">资源对接</option>
              <option value="内容传播">内容传播</option>
              <option value="社群运营">社群运营</option>
              <option value="智力贡献">智力贡献</option>
              <option value="品牌背书">品牌背书</option>
              <option value="技术贡献">技术贡献</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">贡献标题 *</label>
            <input type="text" class="form-input" id="declareTitle" placeholder="一句话概括贡献内容">
          </div>
          <div class="form-group">
            <label class="form-label">贡献详细描述 *</label>
            <textarea class="form-textarea" id="declareDesc" placeholder="详细说明贡献的时间、对象、过程、成果"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">贡献发生时间 *</label>
            <input type="date" class="form-input" id="declareDate">
          </div>
          <div class="form-group">
            <label class="form-label">证明材料</label>
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
              <div class="fua-icon">📎</div>
              <div class="fua-text">点击上传截图、链接、合同、邮件等证明文件</div>
              <div class="fua-hint">支持多文件上传</div>
              <input type="file" id="fileInput" multiple style="display:none" onchange="handleFileUpload(this)">
            </div>
            <div class="file-list" id="fileList"></div>
          </div>
          <div class="form-group">
            <label class="form-label">申请合力值 *</label>
            <input type="number" class="form-input" id="declarePoints" placeholder="参考规则中心的贡献值标准自评填报">
          </div>
          <button class="btn-primary" onclick="submitDeclare()" style="width:100%;justify-content:center;padding:14px">
            📤 提交申报
          </button>
        </div>
        <div class="df-sidebar">
          <h4>📖 自评参考标准</h4>
          ${sidebarItems}
          <div style="margin-top:12px;padding:10px;background:var(--gold-bg);border-radius:var(--radius-xs);font-size:11px;color:var(--gold-dark);line-height:1.6">
            💡 实际合力值以委员会确认为准。提交后5个工作日内完成初审。
          </div>
        </div>
      </div>
    </div>
  `);
});

window.handleFileUpload = function(input) {
  const list = document.getElementById('fileList');
  Array.from(input.files).forEach(f => {
    const item = document.createElement('div');
    item.className = 'fl-item';
    item.innerHTML = `<span>📄</span><span>${f.name}</span><span style="color:var(--text-light)">${(f.size/1024).toFixed(1)}KB</span>`;
    list.appendChild(item);
  });
  showToast(`已选择 ${input.files.length} 个文件`);
};

window.submitDeclare = function() {
  const type = document.getElementById('declareType').value;
  const title = document.getElementById('declareTitle').value.trim();
  const desc = document.getElementById('declareDesc').value.trim();
  const date = document.getElementById('declareDate').value;
  const points = document.getElementById('declarePoints').value;

  if (!type || !title || !desc || !date || !points) {
    showToast('请填写所有必填字段');
    return;
  }
  showToast('申报已提交，状态：审核中');
  setTimeout(() => navigate('/declare'), 1200);
};

// ========== 页面：申报详情 ==========
addRoute('/declare/:id', (params) => {
  const dec = mockData.declares.find(d => d.id === params.id);
  if (!dec) return pageWrap('/declare', '<div class="empty-state"><div class="es-icon">🔍</div><div class="es-text">未找到该申报记录</div></div>');

  let timelineHTML = '';
  if (dec.timeline) {
    timelineHTML = dec.timeline.map(t => {
      const isDone = t.status === '✓';
      const isCurrent = t.status === '待处理';
      const dotClass = isDone ? 'done' : (isCurrent ? 'current' : '');
      return `
        <div class="timeline-item">
          <div class="timeline-dot ${dotClass}">${t.status === '✓' ? '✓' : (isCurrent ? '●' : '')}</div>
          <div class="timeline-time">${t.time}</div>
          <div class="timeline-node">${t.node}</div>
          <div class="timeline-operator">${t.operator}</div>
        </div>
      `;
    }).join('');
  }

  let letterHTML = '';
  if (dec.letter) {
    const l = dec.letter;
    const sigs = l.signers.map(s => `<div class="cl-sig-item"><div class="cl-sig-name">${s}</div></div>`).join('');
    letterHTML = `
      <div class="confirm-letter">
        <div class="cl-header">
          <div class="cl-title">合 力 值 确 认 函</div>
          <div class="cl-subtitle">CONFIRMATION LETTER</div>
        </div>
        <div class="cl-field"><span class="clf-label">致：</span><span class="clf-value">${l.to}</span></div>
        <div class="cl-field"><span class="clf-label">自：</span><span class="clf-value">${l.from}</span></div>
        <div class="cl-field"><span class="clf-label">日期：</span><span class="clf-value">${l.date}</span></div>
        <div class="cl-field"><span class="clf-label">事由：</span><span class="clf-value">${l.subject}</span></div>
        <div class="cl-body">${l.body}</div>
        <div class="cl-vote">
          <span>投票记录：</span>
          <span class="clv-agree">同意 ${l.vote.agree}</span>
          <span class="clv-reject">反对 ${l.vote.reject}</span>
          <span class="clv-abstain">弃权 ${l.vote.abstain}</span>
        </div>
        <div class="cl-signatures">${sigs}</div>
      </div>
    `;
  }

  let chainHTML = '';
  if (dec.chain) {
    const c = dec.chain;
    chainHTML = `
      <div class="chain-info-card">
        <h3>⛓️ 链上确权信息</h3>
        <div class="chain-info-row"><span class="cir-label">确权状态</span><span class="cir-value green">${c.status}</span></div>
        <div class="chain-info-row"><span class="cir-label">区块链</span><span class="cir-value">${c.chain}</span></div>
        <div class="chain-info-row"><span class="cir-label">合约地址</span><span class="cir-value">${c.contract}（Demo模拟）</span></div>
        <div class="chain-info-row"><span class="cir-label">上链时间</span><span class="cir-value">${c.time}</span></div>
        <div class="chain-info-row"><span class="cir-label">区块高度</span><span class="cir-value">${c.block}（Demo模拟）</span></div>
        <div class="chain-info-row"><span class="cir-label">存证哈希</span><span class="cir-value">${c.hash}（Demo模拟）</span></div>
        <div class="chain-info-row"><span class="cir-label">确权合力值</span><span class="cir-value">${c.points.toLocaleString()}</span></div>
        <div class="chain-info-row"><span class="cir-label">确权时阶段系数</span><span class="cir-value">${c.coef}（创世期）</span></div>
        <div class="chain-info-row"><span class="cir-label">最终计入合力值</span><span class="cir-value green" style="font-size:16px">${c.finalPoints.toLocaleString()}</span></div>
      </div>
    `;
  }

  let needMaterialHTML = '';
  if (dec.needMaterial) {
    needMaterialHTML = `
      <div class="detail-section" style="border-color:#fed7aa;background:linear-gradient(135deg,#fff7ed,#ffedd5)">
        <h3 style="color:#c2410c">⚠️ 委员会要求补充材料</h3>
        <div style="font-size:13px;color:#c2410c;line-height:1.8;padding:12px;background:white;border-radius:var(--radius-sm);border:1px solid #fed7aa">
          ${dec.needMaterial}
        </div>
        <div style="display:flex;gap:12px;margin-top:16px">
          <button class="btn-primary" onclick="showToast('请在下方上传补充材料')">📎 补充材料</button>
          <button class="btn-outline" onclick="showToast('已重新提交，等待审核')">🔄 重新提交</button>
        </div>
      </div>
    `;
  }

  return pageWrap('/declare', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/declare')">贡献申报</span>
      <span class="sep">/</span><span>${dec.id}</span>
    </div>
    <div class="partner-page-title">📋 申报详情与确权状态</div>
    <div class="partner-page-subtitle">${dec.id} · ${dec.type}</div>

    <div class="detail-section">
      <h3>📝 申报信息</h3>
      <div class="detail-row"><span class="dr-label">申报编号</span><span class="dr-value" style="font-family:monospace">${dec.id}</span></div>
      <div class="detail-row"><span class="dr-label">提交时间</span><span class="dr-value">${dec.time}</span></div>
      <div class="detail-row"><span class="dr-label">当前状态</span><span class="dr-value"><span class="status-tag ${dec.auditClass}">${dec.auditStatus}</span></span></div>
      <div class="detail-row"><span class="dr-label">贡献类型</span><span class="dr-value">${dec.type}</span></div>
      <div class="detail-row"><span class="dr-label">贡献标题</span><span class="dr-value">${dec.summary}</span></div>
      <div class="detail-row"><span class="dr-label">申请合力值</span><span class="dr-value gold">${dec.points.toLocaleString()}</span></div>
    </div>

    ${timelineHTML ? `
    <div class="detail-section">
      <h3>📅 审核进度时间线</h3>
      <div class="timeline">${timelineHTML}</div>
    </div>` : ''}

    ${letterHTML}

    ${chainHTML}

    ${needMaterialHTML}
  `);
});

// ========== 页面：收益中心 ==========
addRoute('/earnings', () => {
  return pageWrap('/earnings', `
    <div class="partner-page-title">💰 收益中心</div>
    <div class="partner-page-subtitle">佣金 · 分红 · 期权 — 全透明收益追踪</div>
    <div class="tab-switcher">
      <div class="ts-item active" onclick="navigate('/earnings/commission')">💵 佣金明细</div>
      <div class="ts-item" onclick="navigate('/earnings/dividend')">📊 分红明细</div>
      <div class="ts-item" onclick="navigate('/earnings/options')">📈 期权账户</div>
    </div>
    <div id="earningsContent"></div>
  `);
});

// 佣金明细
addRoute('/earnings/commission', () => {
  const rows = mockData.commissions.map(c => `
    <tr>
      <td data-label="日期">${c.date}</td>
      <td data-label="来源业务">${c.source}</td>
      <td data-label="客户">${c.client}</td>
      <td data-label="GMV">${c.gmv}</td>
      <td data-label="分成比例">${c.ratio}</td>
      <td data-label="佣金金额" style="color:var(--gold-dark);font-weight:700">${c.amount}</td>
      <td data-label="状态"><span class="status-tag ${c.statusClass}">${c.status}</span></td>
    </tr>
  `).join('');

  return pageWrap('/earnings', `
    <div class="partner-page-title">💰 收益中心</div>
    <div class="tab-switcher">
      <div class="ts-item active">💵 佣金明细</div>
      <div class="ts-item" onclick="navigate('/earnings/dividend')">📊 分红明细</div>
      <div class="ts-item" onclick="navigate('/earnings/options')">📈 期权账户</div>
    </div>
    <div class="biz-table-wrap">
      <table class="data-table">
        <thead><tr><th>日期</th><th>来源业务</th><th>客户</th><th>GMV</th><th>分成比例</th><th>佣金金额</th><th>状态</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="summary-bar">
      <div class="summary-item"><div class="si-value">¥356,000</div><div class="si-label">累计佣金</div></div>
      <div class="summary-item"><div class="si-value">¥255,000</div><div class="si-label">待结算佣金</div></div>
      <div class="summary-item"><div class="si-value">¥90,000</div><div class="si-label">本月预计到账</div></div>
    </div>
  `);
});

// 分红明细
addRoute('/earnings/dividend', () => {
  const d = mockData.dividends;
  return pageWrap('/earnings', `
    <div class="partner-page-title">💰 收益中心</div>
    <div class="tab-switcher">
      <div class="ts-item" onclick="navigate('/earnings/commission')">💵 佣金明细</div>
      <div class="ts-item active">📊 分红明细</div>
      <div class="ts-item" onclick="navigate('/earnings/options')">📈 期权账户</div>
    </div>

    <div class="detail-section">
      <h3>📅 2026 Q3（已发放）</h3>
      <div class="detail-row"><span class="dr-label">季度合力值快照</span><span class="dr-value">${d.q3.snapshot.toLocaleString()}</span></div>
      <div class="detail-row"><span class="dr-label">其中GMV贡献自动计入</span><span class="dr-value">${d.q3.gmvPoints.toLocaleString()}</span></div>
      <div class="detail-row"><span class="dr-label">其中申报确认贡献计入</span><span class="dr-value">${d.q3.declarePoints.toLocaleString()}</span></div>
      <div class="detail-row"><span class="dr-label">平台季度分红池总额</span><span class="dr-value">${d.q3.poolTotal}</span></div>
      <div class="detail-row"><span class="dr-label">个人占用户分红池比例</span><span class="dr-value">${d.q3.share}</span></div>
      <div class="detail-row"><span class="dr-label">本次分红金额</span><span class="dr-value gold">${d.q3.amount}</span></div>
      <div class="detail-row"><span class="dr-label">状态</span><span class="dr-value"><span class="status-tag status-completed">${d.q3.status}（${d.q3.date}）</span></span></div>
    </div>

    <div class="detail-section" style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-color:#bfdbfe">
      <h3 style="color:#2563eb">🔮 2026 Q4（预估）</h3>
      <div class="detail-row"><span class="dr-label">结算日期</span><span class="dr-value">${d.q4.settleDate}</span></div>
      <div class="detail-row"><span class="dr-label">当前合力值</span><span class="dr-value">${d.q4.currentPoints.toLocaleString()}</span></div>
      <div class="detail-row"><span class="dr-label">预估分红</span><span class="dr-value gold">${d.q4.estimate}</span></div>
      <div style="margin-top:8px;padding:10px 14px;background:white;border-radius:var(--radius-sm);font-size:12px;color:#2563eb">
        💡 ${d.q4.note}
      </div>
    </div>
  `);
});

// 期权账户
addRoute('/earnings/options', () => {
  const o = mockData.options;
  return pageWrap('/earnings', `
    <div class="partner-page-title">💰 收益中心</div>
    <div class="tab-switcher">
      <div class="ts-item" onclick="navigate('/earnings/commission')">💵 佣金明细</div>
      <div class="ts-item" onclick="navigate('/earnings/dividend')">📊 分红明细</div>
      <div class="ts-item active">📈 期权账户</div>
    </div>

    <div class="options-overview">
      <div class="oo-grid">
        <div class="oo-item"><div class="ooi-label">已授予期权</div><div class="ooi-value">${o.granted.toLocaleString()} 股</div></div>
        <div class="oo-item"><div class="ooi-label">占总股本</div><div class="ooi-value">${o.totalPercent}</div></div>
        <div class="oo-item"><div class="ooi-label">已成熟可行使</div><div class="ooi-value">${o.vested.toLocaleString()} 股</div></div>
        <div class="oo-item"><div class="ooi-label">行权价</div><div class="ooi-value">${o.exercisePrice}/股</div></div>
        <div class="oo-item"><div class="ooi-label">最近一轮估值</div><div class="ooi-value">${o.valuation}/股</div></div>
        <div class="oo-item"><div class="ooi-label">纸面价值</div><div class="ooi-value">${o.paperValue}</div></div>
      </div>
    </div>

    <div class="detail-section">
      <h3>📊 成熟进度</h3>
      <div class="detail-row"><span class="dr-label">授予日期</span><span class="dr-value">${o.grantDate}</span></div>
      <div class="detail-row"><span class="dr-label">授予总量</span><span class="dr-value">${o.granted.toLocaleString()} 股，${o.vestingYears}年成熟</span></div>
      <div class="detail-row"><span class="dr-label">已成熟</span><span class="dr-value">${o.vestedPct}%（${o.vested.toLocaleString()} 股）— 可行权</span></div>
      <div class="vesting-bar"><div class="vesting-fill" style="width:${o.vestedPct}%" data-pct="${o.vestedPct}%"></div></div>
      <div class="detail-row"><span class="dr-label">下次成熟</span><span class="dr-value">${o.nextVest}，+${o.nextVestAmount.toLocaleString()} 股</span></div>
    </div>

    <button class="btn-primary" onclick="showToast('行权申请已提交（Demo演示）')" style="width:100%;justify-content:center;padding:14px">
      🔖 申请行权
    </button>
  `);
});

// ========== 页面：线索报备 ==========
addRoute('/leads', () => {
  const rows = mockData.leads.map(l => `
    <tr>
      <td data-label="报备时间">${l.time}</td>
      <td data-label="企业名称">${l.company}</td>
      <td data-label="业务类型">${l.type}</td>
      <td data-label="预计金额">${l.amount}</td>
      <td data-label="状态"><span class="status-tag ${l.statusClass}">${l.status}</span></td>
      <td data-label="归属确认">${l.owner}</td>
    </tr>
  `).join('');

  return pageWrap('/leads', `
    <div class="partner-page-title">🎯 线索报备</div>
    <div class="partner-page-subtitle">防撞单机制 · 时间戳确定客户归属权</div>

    <div class="leads-form-card">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">📋 新增报备</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">企业全称 *</label>
          <input type="text" class="form-input" id="leadCompany" placeholder="企业全称">
        </div>
        <div class="form-group">
          <label class="form-label">业务类型 *</label>
          <select class="form-select" id="leadType">
            <option value="">请选择</option>
            <option>活动赞助</option>
            <option>上市公司入驻</option>
            <option>SaaS订阅</option>
            <option>FA业务</option>
            <option>综艺赞助</option>
            <option>其他</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">联系人及职位</label>
          <input type="text" class="form-input" id="leadContact" placeholder="姓名 职位">
        </div>
        <div class="form-group">
          <label class="form-label">预计合同金额</label>
          <select class="form-select" id="leadAmount">
            <option value="">请选择</option>
            <option>10-50万</option>
            <option>50-100万</option>
            <option>100-500万</option>
            <option>500万以上</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">备注说明</label>
        <textarea class="form-textarea" id="leadNote" placeholder="补充信息" style="min-height:60px"></textarea>
      </div>
      <button class="btn-primary" onclick="submitLead()" style="width:100%;justify-content:center">📤 提交报备</button>
    </div>

    <div class="section-title" style="margin-top:24px">📋 报备记录</div>
    <div class="biz-table-wrap">
      <table class="data-table">
        <thead><tr><th>报备时间</th><th>企业名称</th><th>业务类型</th><th>预计金额</th><th>状态</th><th>归属确认</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `);
});

window.submitLead = function() {
  const company = document.getElementById('leadCompany').value.trim();
  const type = document.getElementById('leadType').value;
  if (!company || !type) {
    showToast('请填写企业名称和业务类型');
    return;
  }
  showToast('报备已提交，客户归属权已确认');
  setTimeout(() => navigate('/leads'), 1200);
};

// ========== 页面：规则中心 ==========
addRoute('/rules', () => {
  return pageWrap('/rules', `
    <div class="partner-page-title">📐 规则中心</div>
    <div class="partner-page-subtitle">GMV分成制 + 贡献申报制 · 所有标准公开透明</div>

    <div class="rules-entry-grid">
      <div class="rules-entry-card" onclick="navigate('/rules/standard')">
        <div class="rec-icon">📊</div>
        <div class="rec-title">分配区间值公示</div>
        <div class="rec-desc">各业务线分成比例区间、贡献值申报标准、结算规则</div>
      </div>
      <div class="rules-entry-card" onclick="navigate('/rules/progress')">
        <div class="rec-icon">🏆</div>
        <div class="rec-title">我的达标进度</div>
        <div class="rec-desc">积分排名、阶段系数、权益等级进度</div>
      </div>
      <div class="rules-entry-card" onclick="navigate('/rules/calculator')">
        <div class="rec-icon">🧮</div>
        <div class="rec-title">收益模拟计算器</div>
        <div class="rec-desc">输入业务类型和金额，一键模拟佣金与积分</div>
      </div>
    </div>
  `);
});

// 分配区间值公示
addRoute('/rules/standard', () => {
  const panels = bizStandards.map((s, idx) => {
    const items = s.items.map(item => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-light)">
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text-primary)">${item.label}</div>
          <div style="font-size:11px;color:var(--text-light);margin-top:2px">${item.note}</div>
        </div>
        <div style="font-size:14px;font-weight:800;color:var(--gold-dark);white-space:nowrap">${item.ratio}</div>
      </div>
    `).join('');
    return `
      <div class="accordion-item ${idx < 2 ? 'open' : ''}">
        <div class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
          <span><span class="ah-icon">${s.icon}</span>${s.title}</span>
          <span class="ah-arrow">▶</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">${items}</div></div>
      </div>
    `;
  }).join('');

  return pageWrap('/rules', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/rules')">规则中心</span>
      <span class="sep">/</span><span>分配区间值公示</span>
    </div>
    <div class="partner-page-title">📊 分配区间值公示</div>
    <div class="partner-page-subtitle">GMV分成制 + 贡献申报制 · 所有标准公开透明 · 实时生效</div>

    ${panels}

    <div class="detail-section" style="margin-top:20px">
      <h3>📌 通用规则说明</h3>
      <div style="font-size:12px;color:var(--text-secondary);line-height:2">
        <p>• <strong>分配基础：</strong>GMV类贡献按毛营收分成，非GMV类贡献按申报审核制。</p>
        <p>• <strong>回款确认：</strong>以款项实际到达合力生态对公账户为准。</p>
        <p>• <strong>客户归属：</strong>以线索报备系统时间戳为唯一判定依据。</p>
        <p>• <strong>申报归属：</strong>以申报提交时间戳为准，相同贡献行为先报者获得确认。</p>
        <p>• <strong>争议处理：</strong>提交至合力值治理委员会，5个工作日内仲裁。</p>
        <p>• <strong>规则更新：</strong>任何调整需经治理委员会60%以上同意，公示15天后生效。</p>
      </div>
    </div>
  `);
});

// 我的达标进度
addRoute('/rules/progress', () => {
  return pageWrap('/rules', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/rules')">规则中心</span>
      <span class="sep">/</span><span>我的达标进度</span>
    </div>
    <div class="partner-page-title">🏆 我的达标进度</div>
    <div class="partner-page-subtitle">当前排名与权益等级</div>

    <div class="stage-card">
      <div class="sc-stage">创世期（2026Q3 - 2027Q2）</div>
      <div class="sc-coef">当前积分加权系数：×3.0</div>
      <div class="stage-progress-bar"><div class="stage-progress-fill" style="width:30%"></div></div>
      <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:6px">阶段进度：已过 30%</div>
    </div>

    <div class="detail-section">
      <h3>📊 积分构成</h3>
      <div class="points-breakdown">
        <div class="points-item"><span class="pi-label">GMV贡献自动计入</span><span class="pi-value">85,000</span></div>
        <div class="points-item"><span class="pi-label">申报确认贡献计入</span><span class="pi-value">28,500</span></div>
        <div class="points-item"><span class="pi-label">其他活动奖励</span><span class="pi-value">15,000</span></div>
        <div class="points-item total"><span class="pi-label">合计（基础值）</span><span class="pi-value">128,500</span></div>
        <div class="points-item total" style="grid-column:1/-1"><span class="pi-label">创世期加权后</span><span class="pi-value">385,500</span></div>
      </div>
    </div>

    <div class="detail-section">
      <h3>🏆 积分排名</h3>
      <div class="detail-row"><span class="dr-label">当前合力值</span><span class="dr-value">128,500</span></div>
      <div class="detail-row"><span class="dr-label">当前排名</span><span class="dr-value gold">第 12 名</span></div>
      <div class="detail-row"><span class="dr-label">下一位差距</span><span class="dr-value">第11名（135,200），差 6,700 分</span></div>
    </div>

    <div class="detail-section">
      <h3>🏅 权益等级进度</h3>
      <div class="level-grid">
        <div class="level-card achieved">
          <div class="lc-title">合力·创世者</div>
          <div class="lc-cond">创世期内积分前100名</div>
          <div class="lc-status">✓ 已达标</div>
        </div>
        <div class="level-card">
          <div class="lc-title">合力·先行官</div>
          <div class="lc-cond">验证期内积分前500名</div>
          <div class="lc-status">未进入验证期</div>
        </div>
        <div class="level-card">
          <div class="lc-title">合力·共建者</div>
          <div class="lc-cond">连续6季度积分前1000名</div>
          <div class="lc-status">未进入成熟期</div>
        </div>
      </div>
      <div style="margin-top:16px;padding:14px;background:var(--gold-bg);border-radius:var(--radius-sm);font-size:12px;color:var(--gold-dark);line-height:1.8">
        <strong>已解锁权益：</strong><br>
        • 紫金"创世者"徽章（永久展示）<br>
        • 平台服务费9折<br>
        • 年度闭门晚宴资格<br>
        • 新功能优先内测权<br><br>
        <strong>距下一级：</strong>先行官等级需进入验证期（2027Q3起）且排名前500，请保持当前贡献节奏。
      </div>
    </div>
  `);
});

// 收益模拟计算器
addRoute('/rules/calculator', () => {
  return pageWrap('/rules', `
    <div class="breadcrumb">
      <span style="color:var(--gold);cursor:pointer" onclick="navigate('/rules')">规则中心</span>
      <span class="sep">/</span><span>收益模拟计算器</span>
    </div>
    <div class="partner-page-title">🧮 收益模拟计算器</div>
    <div class="partner-page-subtitle">输入参数，一键预估佣金与积分</div>

    <div class="tab-switcher">
      <div class="ts-item active" onclick="switchCalcTab('gmv', this)">💼 GMV业务模拟</div>
      <div class="ts-item" onclick="switchCalcTab('nongmv', this)">📝 非GMV贡献模拟</div>
    </div>

    <div id="calcGMV" style="display:block">
      <div class="calc-input-area">
        <div class="form-group">
          <label class="form-label">业务类型</label>
          <select class="form-select" id="calcBizType" onchange="updateCalcSubType()">
            <option value="">请选择</option>
            <option value="综艺赞助">🎬 综艺赞助</option>
            <option value="上市公司入驻">🏢 上市公司入驻</option>
            <option value="SaaS订阅">📊 SaaS订阅销售</option>
            <option value="FA业务">🤝 FA业务</option>
            <option value="融资对接">💰 融资对接</option>
            <option value="活动赞助">🎪 活动赞助</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">子类型/级别</label>
          <select class="form-select" id="calcSubType">
            <option value="">请先选择业务类型</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">合同金额（元）</label>
          <input type="number" class="form-input" id="calcAmount" placeholder="例：500000">
        </div>
        <button class="btn-primary" onclick="calculateGMV()" style="width:100%;justify-content:center">🧮 开始模拟</button>
      </div>
      <div id="calcGMVResult" style="display:none">
        <div class="calc-output-area">
          <h3>📊 模拟结果</h3>
          <div id="calcGMVResultContent"></div>
          <div style="margin-top:16px;font-size:11px;color:var(--text-light);line-height:1.6">
            💡 实际佣金以合同签署及回款到账为准。合力值以系统自动计算为准。
          </div>
        </div>
      </div>
    </div>

    <div id="calcNonGMV" style="display:none">
      <div class="calc-input-area">
        <div class="form-group">
          <label class="form-label">贡献类型</label>
          <select class="form-select" id="calcDeclareType">
            <option value="">请选择</option>
            <option value="资源对接">资源对接</option>
            <option value="内容传播">内容传播</option>
            <option value="社群运营">社群运营</option>
            <option value="智力贡献">智力贡献</option>
            <option value="品牌背书">品牌背书</option>
            <option value="技术贡献">技术贡献</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">自评合力值</label>
          <input type="number" class="form-input" id="calcPoints" placeholder="例：5000">
        </div>
        <div class="form-group">
          <label class="form-label">当前阶段系数</label>
          <input type="text" class="form-input" value="×3.0（创世期）" readonly style="background:var(--gold-bg);color:var(--gold-dark);font-weight:700">
        </div>
        <button class="btn-primary" onclick="calculateNonGMV()" style="width:100%;justify-content:center">🧮 开始模拟</button>
      </div>
      <div id="calcNonGMVResult" style="display:none">
        <div class="calc-output-area">
          <h3>📊 模拟结果</h3>
          <div id="calcNonGMVResultContent"></div>
          <div style="margin-top:16px;font-size:11px;color:var(--text-light);line-height:1.6">
            💡 实际合力值以委员会确认为准。最终分红以季度末快照为准。
          </div>
        </div>
      </div>
    </div>
  `);
});

// 计算器交互
window.switchCalcTab = function(tab, el) {
  document.querySelectorAll('.tab-switcher .ts-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('calcGMV').style.display = tab === 'gmv' ? 'block' : 'none';
  document.getElementById('calcNonGMV').style.display = tab === 'nongmv' ? 'block' : 'none';
};

window.updateCalcSubType = function() {
  const bizType = document.getElementById('calcBizType').value;
  const subType = document.getElementById('calcSubType');
  const subTypes = {
    '综艺赞助': ['冠名赞助 (3%-5%)', '特约赞助 (5%-8%)', '指定产品 (8%-12%)'],
    '上市公司入驻': ['基础入驻 (8%-10%)', '高级入驻 (10%-15%)', '战略入驻 (15%-20%)'],
    'SaaS订阅': ['首年订阅 (25%-35%)', '续费订阅 (8%-12%)', '增购模块 (15%-20%)'],
    'FA业务': ['独家FA (1%-2%)', '联合FA (0.5%-1%)', '顾问费 (固定)'],
    '融资对接': ['股权融资 (0.5%-1.5%)', '债权融资 (0.3%-0.8%)', '并购对接 (0.5%-2%)'],
    '活动赞助': ['峰会赞助 (15%-20%)', '论坛赞助 (12%-18%)', '沙龙赞助 (10%-15%)'],
  };
  const options = subTypes[bizType] || [];
  subType.innerHTML = options.length ? options.map(o => `<option>${o}</option>`).join('') : '<option value="">请先选择业务类型</option>';
};

window.calculateGMV = function() {
  const bizType = document.getElementById('calcBizType').value;
  const subType = document.getElementById('calcSubType').value;
  const amount = parseFloat(document.getElementById('calcAmount').value);

  if (!bizType || !subType || !amount || amount <= 0) {
    showToast('请填写所有参数');
    return;
  }

  // Extract ratio from subType
  const ratioMatch = subType.match(/(\d+)%-(\d+)%/);
  let ratioLow = 0, ratioHigh = 0;
  if (ratioMatch) {
    ratioLow = parseFloat(ratioMatch[1]);
    ratioHigh = parseFloat(ratioMatch[2]);
  }

  const commissionLow = Math.round(amount * ratioLow / 100);
  const commissionHigh = Math.round(amount * ratioHigh / 100);
  const pointsLow = Math.round(amount * 0.05);
  const pointsHigh = Math.round(amount * 0.1);

  document.getElementById('calcGMVResult').style.display = 'block';
  document.getElementById('calcGMVResultContent').innerHTML = `
    <div class="calc-output-row"><span class="cor-label">业务类型</span><span class="cor-value">${bizType}</span></div>
    <div class="calc-output-row"><span class="cor-label">子类型/级别</span><span class="cor-value" style="font-size:13px">${subType}</span></div>
    <div class="calc-output-row"><span class="cor-label">合同金额</span><span class="cor-value">¥${amount.toLocaleString()}</span></div>
    <div class="calc-output-row"><span class="cor-label">分成比例区间</span><span class="cor-value">${ratioLow}% - ${ratioHigh}%</span></div>
    <div class="calc-output-row"><span class="cor-label">预估佣金区间</span><span class="cor-value">¥${commissionLow.toLocaleString()} - ¥${commissionHigh.toLocaleString()}</span></div>
    <div class="calc-output-row"><span class="cor-label">预估合力值</span><span class="cor-value">${pointsLow.toLocaleString()} - ${pointsHigh.toLocaleString()}</span></div>
    <div class="calc-output-row"><span class="cor-label">创世期加权后</span><span class="cor-value">${(pointsLow*3).toLocaleString()} - ${(pointsHigh*3).toLocaleString()}</span></div>
  `;
};

window.calculateNonGMV = function() {
  const type = document.getElementById('calcDeclareType').value;
  const points = parseInt(document.getElementById('calcPoints').value);

  if (!type || !points || points <= 0) {
    showToast('请填写所有参数');
    return;
  }

  const weighted = points * 3;
  const dividendEstimate = Math.round(points * 3 * 0.0008 * 500000 / 100);

  document.getElementById('calcNonGMVResult').style.display = 'block';
  document.getElementById('calcNonGMVResultContent').innerHTML = `
    <div class="calc-output-row"><span class="cor-label">贡献类型</span><span class="cor-value">${type}</span></div>
    <div class="calc-output-row"><span class="cor-label">自评合力值</span><span class="cor-value">${points.toLocaleString()}</span></div>
    <div class="calc-output-row"><span class="cor-label">当前阶段系数</span><span class="cor-value">×3.0（创世期）</span></div>
    <div class="calc-output-row"><span class="cor-label">加权后计入合力值</span><span class="cor-value">${weighted.toLocaleString()}</span></div>
    <div class="calc-output-row"><span class="cor-label">预估排名上升</span><span class="cor-value">约3-5名</span></div>
    <div class="calc-output-row"><span class="cor-label">对下次分红的预估影响</span><span class="cor-value">约+¥${dividendEstimate.toLocaleString()}-${(dividendEstimate*16/10).toLocaleString()}</span></div>
  `;
};

// ========== 初始化 ==========
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

// Expose
window.navigate = navigate;
window.logout = logout;
window.showToast = showToast;

})();
