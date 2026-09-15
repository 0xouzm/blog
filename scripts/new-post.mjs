#!/usr/bin/env node
/**
 * 一键创建新文章：pnpm new "文章标题"
 * 可选：pnpm new "文章标题" --slug my-post-name
 *
 * 文件名就是网址：src/content/posts/my-post-name.md → /posts/my-post-name/
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "src", "content", "posts");

const argv = process.argv.slice(2);
const slugFlagIndex = argv.findIndex(arg => arg === "--slug" || arg === "-s");
const explicitSlug = slugFlagIndex >= 0 ? argv[slugFlagIndex + 1] : undefined;
const title = argv
  .filter((arg, index) => !arg.startsWith("-") && (slugFlagIndex < 0 || index !== slugFlagIndex + 1))
  .join(" ")
  .trim();

if (!title) {
  console.error('\n用法：pnpm new "文章标题" [--slug english-slug]\n');
  process.exit(1);
}

const now = new Date();
const pad = value => String(value).padStart(2, "0");
const offsetMinutes = -now.getTimezoneOffset();
const sign = offsetMinutes >= 0 ? "+" : "-";
const absOffset = Math.abs(offsetMinutes);
const timezone = `${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;
const timestamp =
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
  `T${pad(now.getHours())}:${pad(now.getMinutes())}:00${timezone}`;

const slugify = value =>
  value
    .toLowerCase()
    .replace(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, "") // 中文不进网址
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const slug = (explicitSlug || slugify(title) || "post").trim();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("slug 只能包含小写英文字母、数字和连字符。");
  process.exit(1);
}
await mkdir(postsDir, { recursive: true });

const exists = async path =>
  access(path).then(
    () => true,
    () => false
  );

let fileName = `${slug}.md`;
let counter = 2;
while (await exists(join(postsDir, fileName))) {
  fileName = `${slug}-${counter++}.md`;
}

const template = `---
title: ${JSON.stringify(title)}
pubDatetime: ${timestamp}
featured: false
draft: true
tags:
  - 随笔
description: ""
---

在这里开始写正文。

> [!TIP]
> 写完后把 frontmatter 里的 draft 改成 false，文章才会进入线上构建。
`;

await writeFile(join(postsDir, fileName), template, "utf8");

console.log(`\n✅ 已创建：src/content/posts/${fileName}`);
console.log(`   本地预览：http://localhost:4321/blog/posts/${fileName.replace(/\.md$/, "")}/`);
console.log("   写完后把 draft 改成 false，再 git push 即可发布。\n");
