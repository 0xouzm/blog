/**
 * 把构建好的 Pagefind 搜索索引复制到 public/，让本地 dev 也能用搜索。
 * 用它替代 AstroPaper 原本的 `cp -r`，这样 Windows / macOS / Linux 都能跑。
 */
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "dist", "pagefind");
const target = join(root, "public", "pagefind");

if (!existsSync(source)) {
  console.error(`[pagefind] 找不到 ${source}，请先执行 astro build。`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log("[pagefind] 索引已复制到 public/pagefind");
