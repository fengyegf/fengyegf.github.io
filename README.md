# 🍥 枫叶的小窝 (FY)

基于 [Fuwari](https://github.com/saicaca/fuwari) 模板开发的个人博客，使用 [Astro](https://astro.build) 构建。

[**🖥️在线访问**](https://fengyegf.cn)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**📦原始模板**](https://github.com/saicaca/fuwari)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**👤GitHub**](https://github.com/fengyegf)

> README 版本：`2026-02-06`

> "用代码表达文字的魅力，用代码书写山河的壮丽。" - Express the charm of words with code, and write the magnificence of mountains and rivers with code.

## ✨ 功能特性

- [x] 基于 Astro 和 Tailwind CSS 开发
- [x] 流畅的动画和页面过渡
- [x] 亮色 / 暗色模式
- [x] 自定义主题色和横幅图片
- [x] 响应式设计
- [x] 文章归档和分类
- [x] 项目展示页面
- [x] 说说功能（状态更新）
- [x] 收藏夹功能
- [x] 番组计划
- [x] 搜索功能
- [x] 文内目录（TOC）
- [x] 数学公式支持（KaTeX）
- [x] 代码高亮
- [x] 评论系统

## 🚀 使用方法

1. Clone 本仓库
   ```bash
   git clone https://github.com/fengyegf/fengyegf.github.io.git
   cd fengyegf
   ```

2. 安装依赖
   ```bash
   pnpm install
   pnpm add sharp
   ```
   - 若未安装 [pnpm](https://pnpm.io)，执行 `npm install -g pnpm`

3. 启动开发服务器
   ```bash
   pnpm dev
   ```

4. 自定义配置
   - 编辑 `src/config.ts` 修改站点信息、导航栏、个人资料等
   - 编辑 `astro.config.mjs` 修改站点 URL 和其他构建配置

5. 创建内容
   - 文章：`pnpm new-post <filename>`
   - 项目：`pnpm new-project <filename>`
   - 说说：`pnpm new-status <filename>`

6. 部署
   - 参考 [Astro 官方指南](https://docs.astro.build/zh-cn/guides/deploy/)部署至 Vercel, Netlify, GitHub Pages 等平台

## ⚙️ Frontmatter 配置

### 文章 (Posts)

```yaml
---
title: 文章标题
published: 2026-02-06
updated: 2026-02-06    # 可选
description: 文章描述
image: ./cover.jpg      # 可选
tags: [标签1, 标签2]
category: 分类名称
draft: false            # 草稿状态
lang: zh_CN             # 仅当与站点语言不同时设置
sticky: 0               # 置顶权重，数值越大越靠前
---
```

### 项目 (Projects)

```yaml
---
title: 项目名称
description: 项目描述
image: ./cover.jpg      # 可选
url: https://...        # 可选，项目链接
status: developing      # completed | developing | planned
tags: [技术栈, 标签]
---
```

### 说说 (Status)

```yaml
---
content: 说说内容
published: 2026-02-06
images: []              # 可选，图片数组
---
```

## 🧞 指令

下列指令均需要在项目根目录执行：

| Command                           | Action                            |
|:----------------------------------|:----------------------------------|
| `pnpm install` 并 `pnpm add sharp` | 安装依赖                              |
| `pnpm dev`                        | 在 `localhost:4321` 启动本地开发服务器      |
| `pnpm build`                      | 构建网站至 `./dist/`                   |
| `pnpm preview`                    | 本地预览已构建的网站                        |
| `pnpm new-post <filename>`        | 创建新文章                             |
| `pnpm new-project <filename>`     | 创建新项目                             |
| `pnpm new-status <filename>`      | 创建新说说                             |
| `pnpm astro ...`                  | 执行 `astro add`, `astro check` 等指令 |
| `pnpm astro --help`               | 显示 Astro CLI 帮助                   |

## 📁 项目结构

```
src/
├── assets/          # 静态资源（图片等）
├── components/      # Astro/Svelte 组件
├── content/         # 内容集合
│   ├── posts/      # 博客文章
│   ├── projects/   # 项目展示
│   ├── status/     # 说说/状态
│   └── config.ts   # 内容集合配置
├── layouts/         # 页面布局
├── pages/           # 路由页面
├── styles/          # 全局样式
├── utils/           # 工具函数
└── config.ts        # 站点配置
```

## 🎨 自定义

### 修改主题色

编辑 `src/config.ts` 中的 `themeColor.hue` 值（0-360）：
- 红色: 0
- 橙色: 30
- 黄色: 60
- 绿色: 120
- 青色: 180
- 蓝色: 240
- 紫色: 270
- 粉色: 330

### 修改横幅图片

替换 `src/assets/images/banner.png` 或在配置中修改路径

### 修改头像

替换 `src/assets/images/avatar.png` 或在配置中修改路径

## 📝 内容创建

### 文章写作

```bash
# 创建新文章
pnpm new-post my-new-article

# 编辑生成的文件
# src/content/posts/my-new-article.md
```

支持 Markdown、MDX 格式，支持数学公式（KaTeX）、代码高亮等。

### 项目展示

```bash
# 创建新项目
pnpm new-project my-project

# 编辑生成的文件
# src/content/projects/my-project.md
```

### 说说/动态

```bash
# 创建新说说
pnpm new-status my-status

# 编辑生成的文件
# src/content/status/my-status.md
```

## 🔗 链接

- **个人主页**: [fengyegf.cn](https://fengyegf.cn)
- **GitHub**: [@fengyegf](https://github.com/fengyegf)
- **Twitter**: [@FYGFCN](https://x.com/FYGFCN)
- **Telegram**: [@TPFTY](https://t.me/TPFTY)

## 📄 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

基于 [Fuwari](https://github.com/saicaca/fuwari) 模板开发。

## 🙏 鸣谢

- [Astro](https://astro.build) - 现代化的静态站点生成器
- [Fuwari](https://github.com/saicaca/fuwari) - 原始模板
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
