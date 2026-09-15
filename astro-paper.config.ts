import { defineAstroPaperConfig } from "./src/types/config";

/**
 * 站点全局配置 —— 日常只需要改这个文件。
 * 每个字段的含义见 src/types/config.ts 里的注释。
 */
export default defineAstroPaperConfig({
  site: {
    /** 部署后的真实地址；本地开发随便填，上线前记得改 */
    url: "https://blog.ouzm.top/",
    title: "Jason Nomad",
    description: "分享AI工具技巧🤖 · 记录思考",
    author: "Jason Nomad",
    /** 作者主页，用于结构化数据；不需要可以删掉这一行 */
    profile: "https://www.xiaohongshu.com/user/profile/5d1783090000000010006fdc",
    ogImage: "og.png",
    /** 界面语言：决定 <html lang> 与 i18n 文案，改这里要同步改 astro.config.ts */
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    /** 文章列表每页篇数 */
    perPage: 6,
    /** 首页展示篇数 */
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    /** 每篇文章自动生成分享图，字体从本地构建依赖读取 */
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    /** 「在 GitHub 上编辑此页」按钮；填上你的仓库地址即可开启 */
    editPost: { enabled: true, url: "https://github.com/0xouzm/blog/edit/main/" },
    search: "pagefind",
  },
  /**
   * 评论区（基于 GitHub Discussions 的 Giscus，免费、无广告、无追踪）。
   * 拿这三个值：建一个公开仓库并开启 Discussions → 装 giscus App →
   * 到 https://giscus.app/zh-CN 填入仓库，页面会生成 repo-id 与 category-id。
   * 没填之前，文章底部会显示一份图文步骤说明，不会报错。
   */
  comments: {
    provider: "giscus",
    giscus: {
      repo: "0xouzm/blog",
      repoId: "R_kgDOUbmNTw",
      category: "Announcements",
      categoryId: "DIC_kwDOUbmNT84DFpVP",
      lang: "zh-CN",
      mapping: "pathname",
      reactionsEnabled: "1",
      inputPosition: "bottom",
    },
  },
  socials: [
    // name 必须是 src/assets/icons/socials/ 里存在的文件名
    { name: "github", url: "https://github.com/0xouzm" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
