# 合力指数（Heli-Index）平台

> 新质生产力的资本市场共识平台

## 项目简介

合力指数是《香港商报》旗下，连接上市公司、投资者、专业机构与学研界的多方共识平台。我们追踪"新质生产力"在资本市场的真实共识，并通过全球巡回路演与金鲲鹏颁奖典礼，为上市公司搭建国际投资者对接与品牌荣耀舞台。

## 技术栈

- **框架**：Next.js 15 (App Router)
- **样式**：Tailwind CSS 4
- **语言**：TypeScript
- **后端**：Supabase (Phase 2+)
- **Web3**：成就NFT铸造 (Phase 4)

## 项目结构

```
heli-index/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── layout.tsx         # 根布局（导航+页脚）
│   │   ├── globals.css         # 全局样式+配色系统
│   │   ├── page.tsx           # 首页 /
│   │   ├── index/             # 指数详情 /index
│   │   ├── roadshow/          # 全球路演 /roadshow
│   │   ├── awards/            # 金鲲鹏颁奖 /awards
│   │   ├── profile/[id]/      # 用户成就墙 /profile/demo
│   │   ├── register/          # 注册 /register
│   │   └── login/             # 登录 /login
│   ├── components/             # 可复用组件（待扩展）
│   └── lib/                   # 工具函数（待扩展）
├── mock/                       # Mock 数据
│   ├── awards.json             # 颁奖活动数据
│   └── achievemeents.json     # 成就勋章数据
├── public/                     # 静态资源
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.js
```

## 配色系统

| 角色 | 色值 | 用途 |
|------|------|------|
| 深蓝 | `#0a1628` | 主色，导航/页脚/Hero背景 |
| 共识金 | `#c9a84c` | 强调色，CTA按钮/勋章/金色元素 |
| 颁奖金 | `#d4a843` | 颁奖页专用金色渐变 |

## 启动开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000` 查看。

## Phase 1 交付物（当前）

- [x] 官网首页（Hero、指数概览、新质生产力解读、路演/颁奖入口、成就入口）
- [x] 指数详情页（合力300、港股通、纳斯达克三大指数）
- [x] 全球路演子页面（5站路演日程、往期回顾、报名入口）
- [x] **金鲲鹏颁奖典礼子页面**（Hero区、主颁奖活动卡片、专项颁奖卡片、评选流程、获奖权益、底部CTA）
- [x] 用户成就墙（C端/B端/专业投资者三类勋章，点亮/灰色状态，六边形金属质感）
- [x] 多角色注册/登录框架（4类角色：C端投资者、专业投资者、产学研机构、上市公司）
- [x] Mock 数据（日期使用2026/2027）
- [x] 响应式设计（移动端适配）

## 后续阶段

- **Phase 2**：诊断季活动页、积分与成就基础、用户个人主页
- **Phase 3**：AI Agent对话、开放API雏形、诊断报告页、报名表单联动
- **Phase 4**：区块链存证与成就NFT铸造、B端工作台、路演及颁奖管理后台

## 许可证

MIT
