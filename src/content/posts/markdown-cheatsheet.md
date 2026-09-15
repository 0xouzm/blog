---
title: Markdown 排版速查：这篇文章用来检查样式
author: Jason Nomad
pubDatetime: 2026-08-28T14:00:00+08:00
featured: false
draft: false
tags:
  - 写作
  - Markdown
description: "标题、列表、引用、表格、代码块、提示框的写法与渲染效果，写文章时对着抄就行。"
---

这篇是「样式检查页」：把常用的 Markdown 元素都写一遍，方便看排版效果，也方便日后改主题时对照检查。

## Table of contents

## 文本格式

**加粗**、_斜体_、~~删除线~~、`行内代码`，还有[链接](https://astro.build)。中文与 English 混排时，行高与字距会自动调整。

## 二级标题

### 三级标题

#### 四级标题

正文段落之间留一个空行即可。

## 提示框

主题内置了提示框语法，写文档和教程特别好用：

> [!NOTE]
> 普通提示，用来补充说明。

> [!TIP]
> 小技巧，或者更省事的做法。

> [!WARNING]
> 需要注意的坑，比如会覆盖数据的操作。

> [!IMPORTANT]
> 关键信息，别错过。

## 列表

无序列表：

- 第一项
- 第二项
  - 嵌套的子项
  - 另一个子项
- 第三项

有序列表：

1. 先写标题和摘要
2. 再写正文，一次只写一节
3. 最后通读一遍，删掉三分之一

任务清单：

- [x] 搭好站点骨架
- [x] 写好排版样式
- [ ] 接入评论
- [ ] 写满十篇文章

## 表格

| 语法          | 效果         | 常用场景           |
| ------------- | ------------ | ------------------ |
| `**文字**`    | **加粗**     | 强调关键词         |
| `` `代码` ``  | `行内代码`   | 变量名、命令、路径 |
| `[文字](链接)` | [文字](#)  | 外部引用           |

## 代码块

带语法高亮，右上角有复制按钮：

```ts
type Post = {
  title: string;
  pubDatetime: Date;
  tags: string[];
};

function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.pubDatetime.valueOf() - a.pubDatetime.valueOf()
  );
}
```

行内高亮与删除标记（由 Shiki transformer 提供）：

```js
console.log("这行会被高亮"); // [!code highlight]
// [!code --]
const oldWay = 1; // 会被标记为删除
// [!code ++]
const newWay = 2; // 会被标记为新增
```

```bash
pnpm install    # 安装依赖
pnpm dev        # 本地预览
pnpm build      # 构建到 dist/
```

## 分隔线

---

分隔线用来切分话题。

## 结语

配色与字体集中在 `src/styles/theme.css`，正文排版在 `src/styles/typography.css`，改一处，全站生效。
