/**
 * 分享图（OG image）专用的中文字体。
 *
 * 站点本身完全不加载字体文件（全用系统字体），但 Satori 在构建时渲染
 * 分享图必须拿到真实的字体数据，否则中文会变成空白方框。
 * 所以这里只在构建阶段从 node_modules 读取字体，产物里不会多出字体文件。
 */
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

/** 传给 Satori 的 fontFamily 名称 */
export const OG_FONT_FAMILY = "Noto Sans SC";

/** 只用到常规与粗体两个字重 */
type OgFontWeight = 400 | 700;

const require = createRequire(import.meta.url);
const fallbackRequire = createRequire(join(process.cwd(), "package.json"));
const cache = new Map<OgFontWeight, Promise<Buffer>>();

/** chinese-simplified 子集覆盖常用简体汉字，约 1.5MB，仅构建时读取 */
function resolveFontFile(weight: OgFontWeight): string {
  const fileName = `noto-sans-sc-chinese-simplified-${weight}-normal.woff`;

  for (const req of [require, fallbackRequire]) {
    try {
      return req.resolve(`@fontsource/noto-sans-sc/files/${fileName}`);
    } catch {
      // 换下一个解析器
    }
  }

  const pkgPath = fallbackRequire.resolve("@fontsource/noto-sans-sc/package.json");
  return join(dirname(pkgPath), "files", fileName);
}

/** 读取字体数据（同一个字重只读一次） */
export function loadOgFont(weight: OgFontWeight = 400): Promise<Buffer> {
  const cached = cache.get(weight);
  if (cached) return cached;

  const pending = readFile(resolveFontFile(weight));
  cache.set(weight, pending);
  return pending;
}
