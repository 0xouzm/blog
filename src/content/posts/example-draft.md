---
title: 这是一篇草稿（线上不会出现）
author: 0xouzm
pubDatetime: 2026-09-10T16:00:00+08:00
featured: false
draft: true
tags:
  - 使用说明
description: "演示 draft 字段的作用：本地能看到，构建时会被自动排除。"
---

这篇文件的 frontmatter 里写了 `draft: true`，所以：

- 运行 `pnpm dev` 时，**你能看到它**，方便预览
- 运行 `pnpm build` 时，它**不会进入线上产物**，访客看不到

写长文的时候很有用：先存进仓库慢慢写，等写完了再把 `draft` 改成 `false`。

## 顺便说下时间与排版

文章的发布时间由 `pubDatetime` 决定，如果做过修订，加上 `modDatetime`，页面上会显示「修订于」。

标签写在 `tags` 里，会自动生成标签页；`featured: true` 则会把文章置顶到首页。

> [!WARNING]
> 时间格式要用带时区的标准写法，例如 `2026-09-10T16:00:00+08:00`，否则可能因为时区差被判定成「还没到发布时间」而不显示。
