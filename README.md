# Jason Nomad · 个人博客

基于 [AstroPaper](https://github.com/satnaing/astro-paper) v6 主题搭建的个人站点：
**Astro 7 + Tailwind CSS 4 + Giscus 评论 + Pagefind 搜索**。
纯静态、打开快、没有数据库和后台，日常维护就是「写 Markdown + git push」。

## 本仓库配置

- GitHub：<https://github.com/0xouzm/blog>，默认分支 `main`。
- 作者：`Jason Nomad`；站点地址：<https://blog.ouzm.top/>，部署在域名根路径。
- Pages 使用 GitHub Actions 构建，推送到 `main` 后自动发布。
- Giscus 使用本仓库的 `Announcements` 分类，仓库和分类 ID 已配置，App 授权已验证。
- Cloudflare DNS：`blog` 的 CNAME 指向 `0xouzm.github.io`，DNS only；GitHub Pages 绑定 `blog.ouzm.top`。
- 新文章默认继承站点作者；未提供公开邮箱，因此不显示邮箱社交链接。
- 固定标签：`技术`、`生活随笔`、`读书思考`。在文章 frontmatter 的 `tags` 中选择，新文章默认使用 `生活随笔`。

```bash
git add .
git commit -m "发布新文章"
git push
```

---

## 一、快速开始

```bash
pnpm install     # 安装依赖（首次，需要 Node 22.12+ 与 pnpm）
pnpm dev         # 本地预览 → http://localhost:4321/
pnpm build       # 类型检查 + 构建 + 生成搜索索引 → dist/
pnpm preview     # 预览构建产物
```

写一篇新文章：

```bash
pnpm new "文章的标题"              # 自动生成带 frontmatter 的文件
pnpm new "My Post" --slug my-post  # 也可以指定网址里的 slug
```

---

## 二、日常只需要碰这几个文件

| 我想做的事                             | 改哪里                                          |
| -------------------------------------- | ----------------------------------------------- |
| 站点名 / 简介 / 作者 / 社交链接 / 评论 | `astro-paper.config.ts` ← **最主要的一个文件** |
| 写文章                                 | `src/content/posts/*.md`                        |
| 「关于」页面                           | `src/content/pages/about.md`                    |
| 配色（浅色 / 深色）                    | `src/styles/theme.css`                          |
| 字体（中文 / 英文 / 代码）             | `src/styles/theme.css` ← 改 `--app-font-stack`  |
| 正文排版                               | `src/styles/typography.css`                     |
| 界面文案（导航、按钮、提示）           | `src/i18n/lang/zh-CN.ts`                        |
| 站点地址 / 语言 / 部署子路径           | `astro.config.ts`                               |

### 三、文章可以用的 frontmatter

```yaml
---
title: 文章标题 # 必填
author: 你的名字
pubDatetime: 2026-08-20T09:30:00+08:00 # 必填，务必带时区
modDatetime: 2026-08-25T10:00:00+08:00 # 选填，会显示「修订于」
featured: false # 选填，true 则置顶到首页
draft: false # 选填，true 只在本地可见
tags: # 选填，自动生成标签页
  - 随笔
description: "摘要，会出现在列表页、搜索结果与 RSS 里" # 必填
---
```

文件名决定网址：`src/content/posts/my-post.md` → `/posts/my-post/`。
字段写错时 `pnpm build` 会直接报错并指出是哪一篇。

### 四、Markdown 扩展语法

除了标准 Markdown，主题还支持：

- **提示框**：`> [!NOTE]` / `> [!TIP]` / `> [!WARNING]` / `> [!IMPORTANT]`
- **代码高亮与增删标记**：`// [!code highlight]`、`// [!code ++]`、`// [!code --]`
- **自动目录**：在正文里写一个 `## Table of contents` 标题，会生成可折叠目录
- **图片灯箱**：文章里的图片点击即可放大

默认演示文章和草稿已移除，可用 `pnpm new "文章标题"` 创建第一篇文章。

### 五、字体：零字体文件策略

站点**不加载任何网络字体**，全部走系统字体，所以打开时没有任何字体请求、也没有
字体闪烁（FOUT）。字体栈在 `src/styles/theme.css` 的 `--app-font-stack`：

```css
--app-font-stack:
  ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, /* 英文/数字 */
  "PingFang SC", "HarmonyOS Sans SC", "MiSans",                /* 中文：苹果 / 华为 / 小米 */
  "Hiragino Sans GB", "Source Han Sans SC", "Noto Sans CJK SC",
  "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
```

浏览器是**逐字符**按顺序回退的，所以英文走 Segoe UI / 苹方，中文落到苹方、MiSans、
鸿蒙黑体或微软雅黑——各平台都能拿到本机最好看的那套。

- **想换字体**：把想用的字体名放到中文那一段的最前面即可（本机装了就直接生效）。
  例如装了 MiSans 想全局用它，就把 `"MiSans"` 挪到 `"PingFang SC"` 前面。
- **想用网络字体**（如霞鹜文楷）：在 `astro.config.ts` 里配 `fonts: [...]`，再在
  `--app-font-stack` 最前面加上对应字体名即可。注意中文字体动辄数 MB，建议先做子集化。
- **正文里的代码块**用 `--app-mono-stack`（JetBrains Mono / Cascadia Code / Consolas…）。

> 分享图（OG image）是**例外**：Satori 在构建时必须拿到真实字体数据，否则中文会渲染成
> 空白方框。所以 `@fontsource/noto-sans-sc` 只作为开发依赖，在构建时读取
> （见 `src/utils/ogFont.ts`），**产物里不会多出任何字体文件**。

---

## 六、开启评论（Giscus，约 3 分钟）

评论区已经写好，缺的只是三个值：

1. 建一个**公开** GitHub 仓库（可以就叫 `blog-comments`），进入
   **Settings → General → Features**，勾选 **Discussions**。
2. 安装 [giscus App](https://github.com/apps/giscus)，授权它访问该仓库。
3. 打开 [giscus.app/zh-CN](https://giscus.app/zh-CN)，填入仓库名，页面会生成
   `data-repo-id` 与 `data-category-id`。
4. 把值填进 `astro-paper.config.ts`：

```ts
comments: {
  provider: "giscus",
  giscus: {
    repo: "你的用户名/blog-comments",
    repoId: "R_kgDOxxxxxxx",
    category: "Announcements",
    categoryId: "DIC_kwDOxxxxxxx",
  },
},
```

5. 保存。**不需要改任何组件代码。**

评论配色会跟随站点深浅色自动切换；不想用评论时，把 `provider` 改成 `false` 即可整站关闭。

---

## 七、部署

### 方案 A：GitHub Pages（免费）

1. 把项目推到 GitHub 仓库。
2. 改 `astro-paper.config.ts` 里的 `site.url` 为你的地址。
3. **如果是项目站**（`用户名.github.io/仓库名`），还要在 `astro.config.ts` 里加一行
   `base: "/仓库名"`；如果是用户站（仓库名就叫 `用户名.github.io`）则不需要。
4. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**。
5. 推送到 `main` 分支即自动部署——工作流已经写好：`.github/workflows/deploy.yml`。

### 方案 B：Vercel / Netlify

导入仓库即可，无需改配置：构建命令 `pnpm build`，输出目录 `dist`。

### 方案 C：自己的服务器（Docker）

仓库里带了 `Dockerfile` 与 `compose.yaml`，`docker compose up -d --build` 即可跑起来。

---

## 八、常见问题

**搜索为什么是「索引在构建时生成」？**
站内搜索用 [Pagefind](https://pagefind.app/)，它会在 `pnpm build` 时扫描生成的 HTML 建立索引。
所以 `pnpm dev` 下搜索的是**上一次构建**的结果，写完新文章要看搜索效果，跑一次 `pnpm build` 即可。

**中文搜索能搜到吗？**
可以。Pagefind 能正确切分中文，只是不做词干还原（对中文本来也没意义），构建时会有一行提示，忽略即可。

**文章在本地能看到，线上没有？**
检查 frontmatter 里的 `draft` 是不是 `true`；另外检查 `pubDatetime` 是不是未来时间。

**发布后页面样式或链接全乱了？**
多半是 `base` 没配对——见第七节第 3 点。`site.url` 与 `base` 必须和实际访问地址一致。

**站点放在 OneDrive / 坚果云等同步盘里，装依赖很慢？**
本项目已迁至同步盘外的代码目录。依赖安装和构建会变更大量文件，放在同步目录会增加同步扫描和上传开销。
`.gitignore` 仅控制 Git，不会让 OneDrive 忽略这些目录。日常通过 Git 提交和推送备份源码，依赖和构建产物可重新生成。

---

## 九、技术栈与致谢

- [Astro 7](https://astro.build) — 静态站点生成，默认零 JavaScript
- [AstroPaper](https://github.com/satnaing/astro-paper) — 主题本体（MIT），本仓库在其基础上做了中文化与评论集成
- [Tailwind CSS 4](https://tailwindcss.com) — 样式
- [Giscus](https://giscus.app/zh-CN) — 基于 GitHub Discussions 的评论
- [Pagefind](https://pagefind.app/) — 静态全文搜索

主题原始文档保留在 `README.astro-paper.md`。
