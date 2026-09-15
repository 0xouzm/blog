import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { slugifyStr } from "./slugify";

/** 只展示已发布文章实际使用的标签。 */
export function getUniqueTags(posts: CollectionEntry<"posts">[]) {
  return posts
    .filter(postFilter)
    .flatMap(post => post.data.tags)
    .map(tagName => ({ tag: slugifyStr(tagName), tagName }))
    .filter((value, index, all) => all.findIndex(tag => tag.tag === value.tag) === index)
    .sort((a, b) => a.tag.localeCompare(b.tag));
}
