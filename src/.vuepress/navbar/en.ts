import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  "/demo/",
  {
    text: "Jot down",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Android Makeover Plan",
        icon: "pen-to-square",
        prefix: "android/",
        children: [
          { text: "root-nas free", icon: "pen-to-square", link: "1" },
          { text: "Pagoda panel", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "windows",
        icon: "pen-to-square",
        prefix: "windows/",
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
    text: "Deputy blog",
    icon: "book",
    link: "http://bk.fengyegf.cn",
  },
]);
