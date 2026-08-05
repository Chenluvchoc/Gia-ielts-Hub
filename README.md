# 🎓 Gia IELTS Hub — 雅思备考与语料终极工作台

> 一款 AI 驱动的雅思备考工具，集智能词汇解析、真题同义替换分析、词库管理与 Anki 导出于一体。融合 ChatGPT/LLM 的语义理解能力，将零散的雅思刷题笔记转化为结构化、可检索、可复盘的语料知识库。

**在线体验**：https://gia-ielts-hub.vercel.app

---

## 💡 为什么要做这个工具？

备考雅思时，每个考生都会遇到三个痛点：

1. **生词管理混乱**：遇到生词查词典只能得到一个释义，缺少词性、话题分类、高频搭配和地道例句——而这些都是雅思评分标准真正看重的。手写笔记或 Excel 表格零散不堪，考前根本翻不完。

2. **同义替换靠死记**：阅读和听力中反复出现的 paraphrase 是拿分关键，但每道题做完就忘了，没有系统性归纳「这个表达在真题中被替换成了什么」。

3. **笔记无法复用**：积累的语料散落在各个 PDF、笔记本里，考前想快速按话题或按板块（写作/口语/阅读/听力）复习，根本做不到。

**Gia IELTS Hub** 把这些痛点一次性解决：你用 AI 智能解析生词 → 按雅思标准自动生成结构化卡片 → 存入可搜索、可按板块筛选的词库 → 一键导出 Anki CSV 导入到 Anki 间隔复习。同义替换同理——做完真题顺手录入，AI 帮你分析替换类型和星级，形成你自己的替换库。

---

## ✨ 核心功能

### 模块一：生词与语料智能解析（Vocabulary Hub）

| 功能 | 说明 |
|---|---|
| 🤖 AI 一键解析 | 输入生词/短语，LLM 自动返回：词性、中文释义（6字以内）、适用板块、话题分类、3个高频搭配、1个高分例句 |
| ✅ 交互式勾选入库 | 解析结果卡片可编辑，搭配以复选框列出，自由勾选需要的搭配再存入词库 |
| 📚 词库管理 | 按写作/口语/阅读/听力标签筛选、实时模糊搜索、单条删除 |
| 📥 Anki CSV 导出 | 一键导出为 Tab 分隔 CSV，正面=词汇·释义，反面=搭配·例句，直接导入 Anki |

### 模块二：真题同义替换库（Paraphrase Board）

| 功能 | 说明 |
|---|---|
| 🔄 双输入分析 | 输入「题目表达」与「真题原文表达」，AI 分析替换关系 |
| ⭐ 星级评分 | HTML 星星渲染，直观展示该替换在雅思中的高频程度 |
| 🏷️ 替换类型标注 | 近义表达 / 词性转换 / 上下义词 / 句式重构 / 否定转换 / 逻辑转换 |
| 📋 记录管理 | 按类型筛选、搜索、删除、CSV 导出 |

### 模块三：灵活设置

| 功能 | 说明 |
|---|---|
| 🔌 自定义 LLM | 自由配置 API Base URL、API Key、Model Name，兼容任何 OpenAI 格式接口 |
| ⚡ 一键 JSON 识别 | 粘贴 `newapi_channel_conn` 格式 JSON，自动提取 url 和 key |
| 💾 数据持久化 | 所有配置和词库数据存储在 localStorage，离线可用 |
| 📦 数据迁移 | 支持 JSON 全量导出/导入，换设备无忧 |

---

## 🛠️ 技术栈

- **前端框架**：原生 JavaScript（无依赖）
- **CSS 框架**：Tailwind CSS（CDN）
- **字体**：Inter + PingFang SC / Microsoft YaHei
- **数据持久化**：localStorage
- **PWA**：Manifest + Service Worker 就绪，可添加到手机主屏幕全屏运行
- **AI 接口**：兼容 OpenAI Chat Completions API 格式的任意 LLM

---

## 🚀 快速开始

### 方式一：直接使用（推荐）

1. 打开 https://gia-ielts-hub.vercel.app
2. 点击顶部「设置」标签
3. 配置你的 LLM API（Base URL + API Key + Model）
4. 回到「词库解析」或「同义替换」开始使用

### 方式二：本地运行

```bash
git clone https://github.com/Chenluvchoc/Gia-ielts-Hub.git
cd Gia-ielts-Hub
# 用任意静态服务器打开，例如：
npx serve .
# 或直接用浏览器打开 index.html
```

### LLM API 配置

兼容任何 OpenAI Chat Completions 格式的 API，推荐以下任一：

- **OpenAI 官方**：`https://api.openai.com/v1`
- **国内中转站**（如 tianyuai、api2d 等）
- **本地模型**（如 Ollama + Open WebUI）

在设置页粘贴你的 API JSON 即可自动识别：

```json
{"_type":"newapi_channel_conn","key":"sk-xxx","url":"https://your-api.com"}
```

---

## 📱 PWA：添加到手机主屏幕

Gia IELTS Hub 支持 PWA，添加到手机主屏幕后可**无地址栏全屏运行**，体验接近原生 App。

1. **iOS Safari**：点击底部「分享」→「添加到主屏幕」→ 命名 → 完成
2. **Android Chrome**：菜单 →「添加到主屏幕」或「安装应用」
3. **桌面 Chrome**：地址栏右侧会出现安装图标

---

## 📂 项目结构

```
Gia-ielts-Hub/
├── index.html      # 主应用（单文件，含全部 HTML/CSS/JS）
├── manifest.json   # PWA 清单文件
├── icon.jpg        # 应用图标（主屏图标 + favicon）
└── README.md       # 本文档
```

---

## 🧠 设计理念

- **AI 不做题，AI 帮你整理**：不追求 AI 直接生成答案，而是用 LLM 的语义理解能力把零散输入转化为结构化语料
- **你掌控数据**：所有数据存于本地浏览器，不上传任何服务器（除了你配置的 LLM API）
- **极简交互**：Notion/Linear 风格设计，减少认知负担，专注内容本身
- **移动优先**：完美适配手机端，触控友好，随时随地在手机上录入和复习

---

## 📝 License

MIT

---

> 祝屠鸭顺利 🦆✨
