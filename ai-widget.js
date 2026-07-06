// AI Agent 悬浮聊天组件
(function() {
  if (document.getElementById('ai-widget-container')) return;

  // 注入 CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'ai-widget.css';
  document.head.appendChild(link);

  // 预设对话
  var botResponses = {
    '指数': '您好！合力指数目前包含四大旗舰指数：<br><br>🏛️ <b>港商科指(HKCD-Tech)</b> — 香港商报×香港资本市场学院联合编制，聚焦"硬科技+真创新"<br><br>⭐ <b>合力300(Heli-300)</b> — 首只"共识驱动"新质生产力指数，A+H跨市场<br><br>📊 <b>合力港股通科技</b> — 50只港股通科技龙头<br><br>🌍 <b>合力纳斯达克中概</b> — 跨境中国科技投资基准<br><br>您想了解哪个指数的详情？',
    '港商科指': '🏛️ <b>香港商报港股科技指数 (HKCD-Tech)</b><br><br>• 2026年5月26日发布<br>• 50只成分股，覆盖AI/半导体/生物科技/新能源/智能制造/航空航天<br>• 核心门槛：硬科技收入占比≥50%<br>• 研发费用率≥5%<br>• 季度调仓<br><br>👉 <a href="hkcd-tech.html" style="color:#c9a84c">查看完整详情</a>',
    '投票': '您可以对合力300成分股进行投票，您的投票将影响"热力值"和共识度评分。<br><br>• 普通投资者：1票/日<br>• 认证专业投资者：1.5倍权重<br>• 连续投票可解锁"投票达人"成就<br><br>👉 <a href="indices.html" style="color:#c9a84c">去指数中心投票</a>',
    '路演': '🌍 全球巡回路演正在进行中：<br><br>📍 香港站 (2026年7月) — 即将开始<br>📍 新加坡站 (2026年8月) — 筹备中<br>📍 伦敦站 (2026年9月)<br>📍 纽约站 (2026年11月)<br>📍 达沃斯站 (2027年1月)<br><br>👉 <a href="roadshow.html" style="color:#c9a84c">查看路演详情与报名</a>',
    '成就': '🏆 合力指数成就体系包含三大系列：<br><br>👤 <b>C端投资者</b>：初识共识→投票达人→共识领袖<br>🏢 <b>B端上市公司</b>：新质入场→共识之选→金鲲鹏得主<br>🎓 <b>专业投资者</b>：认证分析师→影响力声音→年度共识之星<br><br>👉 <a href="achievements.html" style="color:#c9a84c">查看完整成就体系</a>',
    '金鲲鹏': '🏆 金鲲鹏奖 · 新质生产力的荣耀时刻<br><br>与达沃斯世界经济论坛边会同期揭晓（2027年1月）<br><br>奖项包括：<br>• 年度卓越上市公司（10家）<br>• 最佳IR团队（5家）<br>• 年度共识领袖（5名）<br>• 年度热力值金奖<br><br>🟡 提名征集中！<br>👉 <a href="awards.html" style="color:#c9a84c">查看金鲲鹏颁奖详情</a>',
    '注册': '注册合力指数账户，解锁全部功能：<br><br>👤 C端投资者：投票+提问+成就<br>🎓 专业投资者：加权投票+深度分析+API<br>🏢 上市公司：认领公司+回复提问+诊断<br><br>👉 <a href="register.html" style="color:#c9a84c">立即注册</a>',
    '因子': '合力指数采用六因子体系：<br><br>🔬 创新投入(25%) | 🤝 共识度(20%) | 🌱 绿色ESG(15%)<br>📊 成长质量(15%) | 💻 数字智能(15%) | 🏭 产业链安全(10%)<br><br>这是全市场首次将"投资者共识"纳入指数编制因子。',
    'API': '合力指数开放API平台提供以下数据接口：<br><br>• 指数实时行情<br>• 成分股数据<br>• 热力值排名<br>• 诊断季报告<br>• 历史回测数据<br><br>专业投资者和B端用户可申请API Key。<br>👉 <a href="api.html" style="color:#c9a84c">查看API文档</a>',
    'default': '感谢您的提问！我可以帮您了解：<br><br>• 📊 指数行情与成分股<br>• 🤝 投票与共识机制<br>• 🌍 全球路演日程<br>• 🏆 金鲲鹏颁奖与成就体系<br>• 📡 开放API接入<br>• 🔗 Web3共识层<br><br>请输入您的问题，或点击下方快捷按钮。'
  };

  function getBotReply(text) {
    var keywords = ['指数','港商科指','投票','路演','成就','金鲲鹏','注册','因子','API'];
    for (var i = 0; i < keywords.length; i++) {
      if (text.indexOf(keywords[i]) !== -1) {
        return botResponses[keywords[i]];
      }
    }
    return botResponses['default'];
  }

  function getTime() {
    var d = new Date();
    return ('0'+d.getHours()).slice(-2) + ':' + ('0'+d.getMinutes()).slice(-2);
  }

  // 构建DOM
  var container = document.createElement('div');
  container.id = 'ai-widget-container';
  container.innerHTML = '<button id="ai-widget-btn" title="AI智能助手">' +
    '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' +
    '<div id="ai-widget-dot"></div></button>' +
    '<div id="ai-widget-panel" class="hidden">' +
    '<div class="ai-panel-header"><h4>🤖 AI 智能助手 <span>合力·共识</span></h4><button class="ai-panel-close" id="ai-panel-close">✕</button></div>' +
    '<div class="ai-chat-body" id="ai-chat-body">' +
    '<div class="ai-msg bot"><div class="ai-msg-bubble">您好！👋 我是合力指数AI助手，可以帮您查询指数行情、投票、路演、成就等信息。有什么可以帮您的？</div><div class="ai-msg-time">' + getTime() + '</div></div>' +
    '</div>' +
    '<div class="ai-quick-questions">' +
    '<button class="ai-quick-btn" data-q="指数">📊 指数行情</button>' +
    '<button class="ai-quick-btn" data-q="港商科指">🏛️ 港商科指</button>' +
    '<button class="ai-quick-btn" data-q="投票">🤝 投票</button>' +
    '<button class="ai-quick-btn" data-q="路演">🌍 路演</button>' +
    '<button class="ai-quick-btn" data-q="成就">🏆 成就</button>' +
    '<button class="ai-quick-btn" data-q="金鲲鹏">🌟 金鲲鹏</button>' +
    '<button class="ai-quick-btn" data-q="因子">🔬 因子</button>' +
    '<button class="ai-quick-btn" data-q="API">📡 API</button>' +
    '</div>' +
    '<div class="ai-chat-input"><input id="ai-chat-input" placeholder="输入您的问题..." /><button id="ai-chat-send">➤</button></div>' +
    '</div>';

  document.body.appendChild(container);

  // 事件绑定
  var panel = document.getElementById('ai-widget-panel');
  var btn = document.getElementById('ai-widget-btn');
  var closeBtn = document.getElementById('ai-panel-close');
  var chatBody = document.getElementById('ai-chat-body');
  var chatInput = document.getElementById('ai-chat-input');
  var chatSend = document.getElementById('ai-chat-send');

  function togglePanel() {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      chatInput.focus();
    }
  }

  btn.addEventListener('click', togglePanel);
  closeBtn.addEventListener('click', function() {
    panel.classList.add('hidden');
  });

  function addMessage(text, isUser) {
    var div = document.createElement('div');
    div.className = 'ai-msg ' + (isUser ? 'user' : 'bot');
    div.innerHTML = '<div class="ai-msg-bubble">' + text + '</div><div class="ai-msg-time">' + getTime() + '</div>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'ai-typing';
    div.id = 'ai-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('ai-typing');
    if (el) el.remove();
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    panel.classList.remove('hidden');
    addMessage(text, true);
    showTyping();
    setTimeout(function() {
      hideTyping();
      addMessage(getBotReply(text), false);
    }, 600 + Math.random() * 800);
    chatInput.value = '';
    chatInput.focus();
  }

  chatSend.addEventListener('click', function() {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage(chatInput.value);
  });

  // 快捷问题
  document.querySelectorAll('.ai-quick-btn').forEach(function(el) {
    el.addEventListener('click', function() {
      sendMessage(this.getAttribute('data-q'));
    });
  });

  // 点击面板外关闭
  document.addEventListener('click', function(e) {
    if (!container.contains(e.target) && !panel.classList.contains('hidden')) {
      panel.classList.add('hidden');
    }
  });
})();
