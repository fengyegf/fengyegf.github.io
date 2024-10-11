import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  "/zh/demo/",
  {
    text: "随手记",
    icon: "pen-to-square",
    prefix: "/zh/posts/",
    children: [
      {
        text: "安卓改造计划",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "免root-nas", icon: "pen-to-square", link: "1" },
          { text: "宝塔面板", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "windows",
        icon: "pen-to-square",
        prefix: "banana/",
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
    ],
  },
  {
    text: "副博客",
    icon: "book",
    link: "http://bk.fengyegf.cn",
  },
]);
