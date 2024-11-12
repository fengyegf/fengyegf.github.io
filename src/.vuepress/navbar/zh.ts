import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  "/zh/demo/",
  {
    text: "随手记",
    icon: "pen-to-square",
    children: [
      {
        text: "安卓改造计划",
        icon: "pen-to-square",
        prefix: "zh/posts/android/",
        children: [
          { text: "免root-nas", icon: "pen-to-square", link: "1" },
          { text: "宝塔面板", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "windows",
        icon: "pen-to-square",
        prefix: "zh/posts/windows/",
        children: [
          {
            text: "QTalkgram",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "FlClash",
            icon: "pen-to-square",
            link: "2",
          },
        ],
      },
      {
        text: "友链",
        icon: "link",
        prefix: "zh/link/",
        children: [
          { text: "友链", icon: "link", link: "1.md" },
        ],
      },
    ],
  },
  {
    text: "副博客",
    icon: "book",
    link: "http://bk.fengyegf.cn",
  },
  {
    text: "收藏夹",
    icon: "folder-open",
    link: "/zh/Collection/1.md",
  },
]);