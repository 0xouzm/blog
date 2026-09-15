---
title: 为什么个人博客用 Astro，而不是 Next.js
author: 0xouzm
pubDatetime: 2026-09-05T10:15:00+08:00
modDatetime: 2026-09-08T20:40:00+08:00
featured: false
draft: false
tags:
  - 技术
  - Astro
description: "从「内容站到底需要什么」出发，比较 Astro 与 Next.js 在个人博客场景下的取舍。"
---

每次有人问我「搭个人博客用什么框架」，我都会先反问一句：**你这个站点需要服务端吗？**

大多数个人博客的答案是：不需要。它需要的只是——把 Markdown 变成好看的 HTML。

## Table of contents

## 内容站的真实需求

一个个人博客，全部需求大概就是这几条：

1. Markdown 写文章
2. 好看的排版
3. 标签、归档、RSS、搜索
4. 打开要快
5. 三年后还能跑起来

注意最后一条。个人项目最大的杀手不是性能，而是**依赖腐烂**：某天你重新安装依赖，构建报了一堆看不懂的错，于是这个站点就再也没更新过。

## Astro 的取舍

Astro 的核心设计是「默认零 JavaScript」：页面在构建时渲染成静态 HTML，只有明确标记的组件才会给浏览器发 JS。

对博客来说，这意味着：

- 首屏没有 hydration，没有白屏等待
- 服务器不需要 Node 运行时，扔到任何静态托管都能跑
- 想要交互时（比如评论、搜索），随时可以引入一个客户端脚本

代价是：如果你要做登录、数据库、实时接口，Astro 就不是最优解了——那种场景 Next.js 更合适。

## 一个具体的对比

同样是「文章列表页」，两者的心智模型不太一样：

```jsx
// Next.js：这是一个在服务端执行的 React 组件
export default async function Page() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map(p => (
        <li key={p.slug}>{p.title}</li>
      ))}
    </ul>
  );
}
```

```astro
---
// Astro：frontmatter 里是构建时执行的代码，下面是纯粹的 HTML 模板
import { getCollection } from "astro:content";
const posts = await getCollection("posts");
---

<ul>
  {posts.map(post => <li>{post.data.title}</li>)}
</ul>
```

模板部分就是 HTML，没有 `className`、没有 `key`、没有 hooks 的心智负担。对写内容的人来说，这一点很省心。

## 什么时候该选 Next.js

- 需要用户登录、权限系统
- 需要数据库读写、后台管理界面
- 需要大量客户端交互（仪表盘、编辑器）
- 团队已经在用 React 生态

反过来，如果只是「写点东西给人看」，Astro 会让你少写很多代码，也少操很多心。

## 结论

**个人博客是内容站，内容站就该用内容站的工具。**

选工具最好的标准不是「它有多强」，而是「它有多难被我用坏」。Astro 在这一点上做得很好：结构简单到你可以完全理解它，也就能自己修好它。
