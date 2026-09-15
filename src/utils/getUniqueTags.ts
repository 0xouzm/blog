import type { CollectionEntry } from "astro:content";
import { BLOG_TAGS } from "../tags";
import { slugifyStr } from "./slugify";

/** 固定分类始终显示，包括暂时没有文章的分类。 */
export function getUniqueTags(_posts: CollectionEntry<"posts">[]) {
  return BLOG_TAGS.map(tagName => ({ tag: slugifyStr(tagName), tagName }));
}
