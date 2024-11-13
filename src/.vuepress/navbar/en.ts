import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  "/demo/",
  {
    text: "Jot down",
    icon: "pen-to-square",
    children: [
      {
        text: "Android Makeover Plan",
        icon: "pen-to-square",
        prefix: "posts/android/",
        children: [
          { text: "root-nas free", icon: "pen-to-square", link: "1" },
          { text: "Pagoda panel", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "windows",
        icon: "pen-to-square",
        prefix: "posts/windows/",
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
        text: "link",
        icon: "link",
        prefix: "link/",
        children: [
          { text: "link", icon: "link", link: "1.md" },
        ],
      },
    ],
  },
  {
    text: "Deputy blog",
    icon: "book",
    link: "http://bc.fengyegf.cn",
  },
  {
    text: "Bookmarks",
    icon: "user",
    link: "/Collection/1.md",
  },
]);
